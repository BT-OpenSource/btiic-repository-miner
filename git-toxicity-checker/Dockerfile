FROM  debian:9-slim
ADD https://github.com/openfaas/faas/releases/download/0.11.1/fwatchdog /usr/bin
RUN chmod +x /usr/bin/fwatchdog

FROM openjdk:8-alpine
ENV write_timeout '0'
ENV read_timeout '0'
ENV exec_timeout '0'
ENV combine_output 'false'
RUN apk update &&\
    apk add --no-cache git &&\
    apk add --no-cache jq &&\
    apk add --no-cache curl &&\
    apk add --no-cache ca-certificates &&\
    apk add --no-cache python3
COPY --from=0 /usr/bin/fwatchdog /usr/bin/fwatchdog
COPY . ./
ENV fprocess="/bin/sh /toxicity.sh"
HEALTHCHECK --interval=5s CMD [ -e /tmp/.lock ] || exit 1
EXPOSE 8080
CMD ["fwatchdog"]