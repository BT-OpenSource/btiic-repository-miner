FROM debian:9-slim
ADD https://github.com/openfaas/faas/releases/download/0.11.1/fwatchdog /usr/bin
RUN chmod +x /usr/bin/fwatchdog

FROM python:3.8-buster
ENV write_timeout '0'
ENV read_timeout '0'
ENV exec_timeout '0'
ENV combine_output 'false'
COPY --from=0 /usr/bin/fwatchdog /usr/bin/fwatchdog
COPY . ./
ENV fprocess="python coupling-info.py"
HEALTHCHECK --interval=5s CMD [ -e /tmp/.lock ] || exit 1
EXPOSE 8080
CMD ["fwatchdog"]