FROM debian:9-slim
ADD https://github.com/openfaas/faas/releases/download/0.11.1/fwatchdog /usr/bin
RUN chmod +x /usr/bin/fwatchdog

FROM golang:1.12-buster
RUN mkdir /build
COPY . ./build
RUN cd build && \
    go get && \
    CGO_ENABLED=0 go build -o tool && \
    mkdir -p etc/ssl/certs && \
    cp /etc/ssl/certs/ca-certificates.crt etc/ssl/certs/

FROM scratch
ENV write_timeout '0'
ENV read_timeout '0'
ENV exec_timeout '0'
ENV combine_output 'false'
COPY . ./
COPY --from=0 /usr/bin/fwatchdog /usr/bin/fwatchdog
COPY --from=1 . .
ENV fprocess="./tool"
HEALTHCHECK --interval=5s CMD ["/healthcheck"]
EXPOSE 8080
CMD ["/fwatchdog"]