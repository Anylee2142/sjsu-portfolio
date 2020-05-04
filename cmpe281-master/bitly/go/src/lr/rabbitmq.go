
package main

import (
  "github.com/streadway/amqp"
)

// var rabbitmq_connect = "amqp://guest:guest@localhost:5672/"
var rabbitmq_connect string

var conn *(amqp.Connection)
var ch *(amqp.Channel)
var q amqp.Queue
var msgs <-chan amqp.Delivery

// var rabbitmq_connect = "amqp://guest:guest@rabbitmq:5672/"
//
// var conn *(amqp.Connection) = openConnection()
// var ch *(amqp.Channel) = openChannel(conn)
// var q amqp.Queue = declareAndGetQueue(ch)
// var msgs <-chan amqp.Delivery = getMessages(ch, q)

// TODO: fix to accept custom port here
func openConnection(url string) *(amqp.Connection) {
    conn, err := amqp.Dial(rabbitmq_connect)
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

func getMessages(ch *(amqp.Channel), q amqp.Queue) <-chan amqp.Delivery {
    msgs, err := ch.Consume(
        q.Name, // queue
        "",     // consumer
        true,   // auto-ack
        false,  // exclusive
        false,  // no-local
        false,  // no-wait
        nil,    // args
    )
    errorLogging(err, "Failed to register a consumer")
    return msgs
}

