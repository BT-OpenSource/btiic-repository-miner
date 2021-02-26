package main

import (
	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing/object"
	"gopkg.in/src-d/go-git.v4/storage/memory"
	"time"
	"os"
	"fmt"
	"encoding/json"
	"errors"
)

type LogEntry struct {
	Revision string `json:"revision"`
	Author string `json:"author"`
	Date time.Time `json:"date"`
	Message string `json:"message"`
	Files []string `json:"files"`
} 

type Log = []LogEntry

type Error struct {
	Error string `json:"error"`
}

type Request struct {
	ProjectUrl string
	Server string
	Token string
	User string
	Password string
}

type Response struct {
	Result Log `json:"result"`
}

func outputJson(out interface{}){
	encoder := json.NewEncoder(os.Stdout)
	encoder.Encode(out)
}

func getFiles(change *object.Change) []string {
	if (change == nil) {
		return nil
	} else if (change.From == object.ChangeEntry{}){
		return []string{"/"+change.To.Name}
	} else if (change.To == object.ChangeEntry{}){
		return []string{"/"+change.From.Name}
	} else {
		if change.From.Name == change.To.Name {
			return []string{"/"+change.From.Name}
		} else {
			return append([]string{"/"+change.From.Name}, []string{"/"+change.To.Name}...)
		}
	}
}

func processCommit(commit *object.Commit, includeMerges bool) (LogEntry, error) {

	// Check to see if this is a merge commit

	if (includeMerges == false && commit.NumParents() > 1) { return LogEntry{}, errors.New("Unwanted Merge Commit") }

	parentCommit, parentErr := commit.Parent(0)
	commitTree, ctreeErr := commit.Tree()
	var parentTree *object.Tree
	var ptreeErr error

	if (parentErr != nil){
		if(commit.NumParents() == 0){
			parentTree = nil
			ptreeErr = nil
		} else {
			return LogEntry{}, errors.New("Error getting parent")
		}
	} else {
		parentTree, ptreeErr = parentCommit.Tree()
	}

	if (ctreeErr != nil || ptreeErr != nil) { return LogEntry{}, errors.New("Unable to fetch trees") }

	changes, err := commitTree.Diff(parentTree)

	if err != nil {
		return LogEntry{}, err
	}

	// Build a list of the files contained in the changes
	var files []string
	for _, change := range changes {	
		files = append(files, getFiles(change)...)
	}

	return LogEntry{
		Revision: commit.Hash.String(),
		Author: commit.Author.Name + " <" + commit.Author.Email + ">",
		Date: commit.Author.When,
		Message: commit.Message,
		Files: files}, nil
}

func sendIfError(err error){
	if err != nil {
		outputJson(Error{
			Error: err.Error(),
		})
		os.Exit(0)
	}
}

func main(){

	// Setup some options

	includeMerges := false

	// Read from stdin

	var request Request
	err := json.NewDecoder(os.Stdin).Decode(&request)
	sendIfError(err)

	// If there is a token, or a username and password then setup the auth for the clone

	var repositoryUrl string
	if(request.Token != ""){
	    repositoryUrl = fmt.Sprintf("https://oauth2:%s@%s%s", request.Token, request.Server, request.ProjectUrl)
	} else if(request.User != "" || request.Password != "") {
	    repositoryUrl = fmt.Sprintf("https://%s:%s@%s%s", request.User, request.Password, request.Server, request.ProjectUrl)
	} else {
	    repositoryUrl = fmt.Sprintf("https://%s%s", request.Server, request.ProjectUrl)
	}

	// Clone the repository to memory
	repo, err := git.Clone(memory.NewStorage(), nil, &git.CloneOptions{
		URL: repositoryUrl,
	})

	if(err != nil && err.Error() == "authentication required") {
	    repositoryUrl = fmt.Sprintf("https://%s%s", request.Server, request.ProjectUrl)
		repo, err = git.Clone(memory.NewStorage(), nil, &git.CloneOptions{
		    URL: repositoryUrl,
	    })
	    sendIfError(err)
	}

	// Retrieve the head of the branch

	ref, err := repo.Head()
	sendIfError(err)

	// Loop of the commits and compute the necessary details

	commits, _ := repo.Log(&git.LogOptions{From: ref.Hash()})
	var entries Log

	for {
		
		// Get the next commit
		commit, err := commits.Next()

		// If we couldn't get another commit then stop here
		if err != nil { break }

		// Process the log entry
		entry, err := processCommit(commit, includeMerges)

		// If the log entry isn't empty the include it in the output
		if (err == nil){
			entries = append(entries, entry)
		}			
	}

	outputJson(Response{Result:entries})

}