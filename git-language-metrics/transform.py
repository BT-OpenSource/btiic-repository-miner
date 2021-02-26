import lizard
import json
import statistics
import sys


def validate(ext):
    valid_extensions = ['cpp', 'c', 'csharp', 'javascript', 'swift', 'scala', 'python', 'ruby', 'php', 'lua', 'ttcn', 'ttcn3']
    return ext in valid_extensions


def get_file_data(name_list):

    file_data = []
    for filename in name_list:
        file_data.append(lizard.analyze_file(filename))

    return file_data


def set_complexity(file_data):

    final_data = [];
    for file in file_data:
        cyclo_stats = []
        for func_values in file.__dict__.get("function_list"):
            cyclo_stats.append(func_values.cyclomatic_complexity)

        if not cyclo_stats:
            complexity = 0
        else:
            complexity = statistics.median(cyclo_stats)

        filename = file.filename.replace("./" + sys.argv[1] + "repo/", "")

        final_data.append({
            'filename': "/" + filename,
            'cyclomatic_complexity': complexity,
            'num_lines': file.nloc,
            'num_tokens': file.token_count
        })

    return final_data;


def get_name_list(lang):

    name_list = []

    analysis_results = analyze(["./"+sys.argv[1]+"repo/"], [lang]) if validate(lang) else analyze(["./"+sys.argv[1]+"repo/"], None)

    for x in analysis_results:
        filename = x.__dict__.get("filename")
        name_list.append(filename)
    return name_list


def analyze(repo, lang):
    return lizard.analyze(repo, None, 1, None, lang)


def run():
    languages = ['cpp', 'c', 'csharp', 'javascript', 'swift', 'scala', 'python', 'ruby', 'php', 'lua', 'ttcn', 'ttcn3']
    all_file_data = {}
    for language in languages:
        namelist = get_name_list(language)
        file_data = get_file_data(namelist)
        all_file_data[language] = set_complexity(file_data);
    print(json.dumps(all_file_data))


# Main service body
if __name__ == "__main__":
    run()
