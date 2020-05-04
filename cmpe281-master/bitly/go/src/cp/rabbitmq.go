
package main

import (
  "github.com/streadway/amqp"
)

// var rabbitmq_connect = "amqp://guest:guest@localhost:5672/"
var rabbitmq_connect string

var conn *(amqp.Connection)
var ch *(amqp.Channel)
var q amqp.Queue

// var rabbitmq_connect = "amqp://guest:guest@rabbitmq:5672/"
//
// var conn *(amqp.Connection) = openConnection()
// var ch *(amqp.Channel) = openChannel(conn)
// var q amqp.Queue = declareAndGetQueue(ch)

func openConnection(url string) *(amqp.Connection) {
    conn, err := amqp.Dial(url)
    errorLogging(err, "Failed to connect to RabbitMQ")
    return conn
}

func openChannel(conn *(amqp.Connection)) *(amqp.Channel) {
    ch, err := conn.Channel()
    errorLogging(err, "Failed to open a channel")
    return ch
}

func declareAndGetQueue(ch *(amqp.Channel)) amqp.Queue {
    q, err := ch.QueueDeclare(
        "hello", // name
        false,   // durable
        false,   // delete when unused
        false,   // exclusive
        false,   // no-wait
        nil,     // arguments
    )
    errorLogging(err, "Failed to declare a queue")
    return q
}

func publishMessage(ch *(amqp.Channel), q amqp.Queue, message []byte) {
    err := ch.Publish(
      "",     // exchange
      q.Name, // routing key
      false,  // mandatory
      false,  // immediate
      amqp.Publishing {
        ContentType: "application/json",
        Body:        []byte(message),
      })
    errorLogging(err, "Failed to publish a message")
}