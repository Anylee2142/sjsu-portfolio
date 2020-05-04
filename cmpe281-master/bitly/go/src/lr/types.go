/*
	Gumball API in Go (Version 1)
	Basic Version with no Backend Services
*/

package main

import (
	"encoding/json"
)

type originalLink struct {
    Original string `json:"original"`
}

type shortenedLink struct {
    Uuid string
    Original string
    Shortened string
    Time string
}

func EventShortenedLink(event string, sl shortenedLink) ([]byte, error) {
    return json.Marshal(struct {
        shortenedLink
        Event string
    }{
        shortenedLink: shortenedLink(sl),
        Event:    event,
    })
}

