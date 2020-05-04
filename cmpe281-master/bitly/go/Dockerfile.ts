FROM golang:latest 
EXPOSE 3002
RUN mkdir /app 
ADD ./src/ts/ /app/src/ts/
ADD ./src/github.com /app/src/github.com
WORKDIR /app 
ENV GOPATH /app
RUN cd /app ; go install ts
CMD ["/app/bin/ts"]
RUN rm -rf /app/src