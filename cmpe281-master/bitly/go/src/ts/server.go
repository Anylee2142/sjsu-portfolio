/*
	Gumball API in Go (Version 1)
	Basic Version with no Backend Services
*/

package main

import (
    "log"
    "sort"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/satori/go.uuid"
	"github.com/unrolled/render"
    "github.com/codegangsta/negroni"
)

// NewServer configures, receive message from subscribed queue, and returns a Server.
func NewServer() *negroni.Negroni {
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	n := negroni.Classic()
	mx := mux.NewRouter()
	initRoutes(mx, formatter)

	n.UseHandler(mx)
	return n
}


// API Routes
func initRoutes(mx *mux.Router, formatter *render.Render) {
    mx.HandleFunc("/ping", pingHandler(formatter)).Methods("GET")
	mx.HandleFunc("/all", retrievingAllEventsHandler(formatter)).Methods("GET")
	mx.HandleFunc("/generate", retrievingAllGenerateEventsHandler(formatter)).Methods("GET")
	mx.HandleFunc("/generate/{shortenedLink}", retrievingGenerateEventHandler(formatter)).Methods("GET")
	mx.HandleFunc("/click", retrievingAllClickEventsHandler(formatter)).Methods("GET")
	mx.HandleFunc("/click/{shortenedLink}", retrievingClickEventHandler(formatter)).Methods("GET")
	mx.HandleFunc("/aggregate", aggregateClickEventHandler(formatter)).Methods("GET")
}

// API Ping Handler
func pingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Test string }{"API version 1.0 alive!"})
	}
}

// Retrieve All Events
func retrievingAllEventsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		allEvents, _ := fetchAllFromNoSQL()
        formatter.JSON(w, http.StatusOK, allEvents)
	}
}

// Retrieve All Generate Events
func retrievingAllGenerateEventsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		allGenerateEvents, _ := extractAllKeywordEvents("Generate")
        formatter.JSON(w, http.StatusOK, allGenerateEvents)
	}
}

// Retrieve a Generate Event with the link
func retrievingGenerateEventHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
        params := mux.Vars(req)
		shortened_link := params["shortenedLink"]
		theEvent, _ := fetchFromNoSQL(shortened_link)

		formatter.JSON(w, http.StatusOK, theEvent)
	}
}

// Retrieve All Click Events
func retrievingAllClickEventsHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		allClickEvents, _ := extractAllKeywordEvents("Click")
        formatter.JSON(w, http.StatusOK, allClickEvents)
	}
}

// Retrieve Click Event(s) with the link
func retrievingClickEventHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
        params := mux.Vars(req)
		shortened_link := params["shortenedLink"]
		clickEvents, _ := extractClickEventsWithLink(shortened_link)

		formatter.JSON(w, http.StatusOK, clickEvents)
	}
}

// Aggregate and Sort how many times each Link clicked
func aggregateClickEventHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
        keys, _ := fetchKeysFromNoSQL()
        log.Println("Fetching Keys finished")
        results, _ := fetchAllFromNoSQL()
        log.Println("Fetching Results finished")

        var aggregates []aggregateClickEvents

        for _, shortened_link := range keys {
            indices := []int{}
            var extracted []eventShortenedLink
            for idx, result := range results {
                if result.Event == "Click" && result.Shortened == shortened_link {
                indices = append(indices, idx)
                }
            }
            for _, idx := range indices {extracted = append(extracted, results[idx])}

            // If extracted matches with shortened_link
            if len(extracted) > 0 {
                log.Println("\tExtracted: ", extracted)
                uuid, _ := uuid.NewV4()
                generatedUuid := uuid.String()
                aggregates = append(aggregates, aggregateClickEvents{Shortened: shortened_link, Uuid: generatedUuid, TotalClicks: len(extracted), Details: extracted})
            }

        }

        // Sort by age, keeping original order or equal elements.
        sort.SliceStable(aggregates, func(i, j int) bool {
            return aggregates[i].TotalClicks > aggregates[j].TotalClicks
        })

		formatter.JSON(w, http.StatusOK, aggregates)
	}
}