FROM golang:latest 
EXPOSE 3000
RUN mkdir /app 
ADD ./src/cp/ /app/src/cp/
ADD ./src/github.com /app/src/github.com
WORKDIR /app
ENV GOPATH /app
RUN cd /app ; go install cp
CMD ["/app/bin/cp"]
RUN rm -rf /app/src