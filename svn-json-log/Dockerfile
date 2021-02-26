FROM debian:9-slim
ADD https://github.com/openfaas/faas/releases/download/0.11.1/fwatchdog /usr/bin
RUN chmod +x /usr/bin/fwatchdog

FROM ubuntu:bionic
ENV write_timeout '0'
ENV read_timeout '0'
ENV exec_timeout '0'
ENV combine_output 'false'
ENV LC_CTYPE 'C.UTF-8'
ENV PYTHONIOENCODING 'utf-8:surrogateescape'
RUN apt-get update &&\
    apt-get install -y subversion &&\
    apt-get install -y jq &&\
    apt-get install -y curl &&\
    apt-get install -y ca-certificates &&\
    apt-get install -y python3
COPY --from=0 /usr/bin/fwatchdog /usr/bin/fwatchdog
COPY . ./
RUN chmod +x ./*.sh
ENV fprocess="./svn-json.sh"
HEALTHCHECK --interval=5s CMD [ -e /tmp/.lock ] || exit 1
EXPOSE 8080
CMD ["fwatchdog"]