/*
	Gumball API in Go (Version 1)
	Basic Version with no Backend Services
*/

package main

// import (
// 	"encoding/json"
// )

type eventShortenedLink struct {
    Event string
    Uuid string
    Original string
    Shortened string
    Time string
}

type aggregateClickEvents struct {
    Shortened string
    Uuid string
    TotalClicks int
    Details []eventShortenedLink
}