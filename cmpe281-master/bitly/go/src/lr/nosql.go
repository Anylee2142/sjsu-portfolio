
package main

import (
    "log"
    "net/http"
    "bytes"
    "io/ioutil"
    "encoding/json"
    "strings"
    "errors"
    "time"
    "github.com/satori/go.uuid"
)

// var nosql_connect = "http://api_node_1:9090/"
var nosql_connect string

// http://localhost:{{api_node_1}}/api/{uuid}

func cacheToNoSQL(res shortenedLink) {
        url := nosql_connect + "api/" + res.Shortened

        createEvent, _ := EventShortenedLink("Generate", res)

        req, err := http.NewRequest("POST", url, bytes.NewBuffer(createEvent))
        req.Header.Set("Content-Type", "application/json")

        client := &http.Client{}
        resp, err := client.Do(req)
        errorLogging(err, "Failed to Cache to NoSQL")
        defer resp.Body.Close()

        body, _ := ioutil.ReadAll(resp.Body)

        log.Println("Cache to NoSQL URL:>", url,
        "\nresponse Status:", resp.Status,
        "\n\tresponse Headers:", resp.Header,
        "\n\tresponse Body:", string(body))
}

func fetchFromNoSQL(shortened_link string) (shortenedLink, error) {
            url := nosql_connect + "api/" + shortened_link
//             url := nosql_connect + "/Uncomment this if testing mysql fetching"

            req, err := http.NewRequest("GET", url, nil)
            req.Header.Add("Accept", "application/json")
//             req.Header.Set("Content-Type", "application/json")

            client := &http.Client{}
            resp, err := client.Do(req)
            errorLogging(err, "Failed to Fetch from NoSQL")
            defer resp.Body.Close()

            body, _ := ioutil.ReadAll(resp.Body)

            log.Println("Fetch From NoSQL URL:>", url,
            "\nresponse Status:", resp.Status,
            "\n\tresponse Headers:", resp.Header,
            "\n\tresponse Body:", string(body))

            if strings.Contains(resp.Status, "200") {
                var res shortenedLink
                json.Unmarshal(body, &res)
                return res, nil
            } else {
                return shortenedLink{}, errors.New("Response 400")
            }
}

func insertHistoryToNoSQL(res shortenedLink) {
        uuid, _ := uuid.NewV4()
        res.Uuid = uuid.String()
        res.Time = time.Now().String()
        clickEvent, _ := EventShortenedLink("Click", res)

        url := nosql_connect + "api/" + res.Uuid

        req, err := http.NewRequest("POST", url, bytes.NewBuffer(clickEvent))
        req.Header.Set("Content-Type", "application/json")

        client := &http.Client{}
        resp, err := client.Do(req)
        errorLogging(err, "Failed to Cache to NoSQL")
        defer resp.Body.Close()

        body, _ := ioutil.ReadAll(resp.Body)

        log.Println("Insert History to NoSQL URL:>", url,
        "\nresponse Status:", resp.Status,
        "\n\tresponse Headers:", resp.Header,
        "\n\tresponse Body:", string(body),
        "\n\tNewly Generated UUID for Click event: " + res.Uuid)
}