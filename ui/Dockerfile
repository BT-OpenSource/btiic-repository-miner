FROM node:11
RUN mkdir /build
COPY ./ /build
RUN cd /build
RUN yarn install
RUN yarn build

FROM nginx:1.17.10
MAINTAINER BetaLab

RUN apt-get update -y && \
    apt-get install -y python3 && \
    apt-get clean

COPY ./configs/container/start.sh /start.sh
COPY ./configs/container/env_setup.py /env_setup.py
COPY ./configs/container/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /build/build /usr/share/nginx/html

CMD ["/bin/bash", "/start.sh"]
