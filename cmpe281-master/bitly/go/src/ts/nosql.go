
package main

import (
    "log"
    "net/http"
    "io/ioutil"
    "encoding/json"
    "strings"
    "errors"
)

// var nosql_connect = "http://api_node_1:9090/"
var nosql_connect string

// http://localhost:{{api_node_1}}/api/{uuid}

func fetchAllFromNoSQL() ([]eventShortenedLink, error) {
            keys, err := fetchKeysFromNoSQL()
            if err != nil {
                return []eventShortenedLink{}, err
            }

            // Extract content of each document with each key
            var extracted []eventShortenedLink
            for _, key := range keys {
                eventDocument, err := fetchFromNoSQL(key)
                if err != nil {
                    return []eventShortenedLink{}, errors.New("Response 400")
                }
                extracted = append(extracted, eventDocument)
            }

            return extracted, nil
}

func fetchKeysFromNoSQL() ([]string, error) {
            url := nosql_connect + "api"

            req, err := http.NewRequest("GET", url, nil)
            req.Header.Add("Accept", "application/json")

            client := &http.Client{}
            resp, err := client.Do(req)
            errorLogging(err, "Failed to Fetch from NoSQL")
            defer resp.Body.Close()

            body, _ := ioutil.ReadAll(resp.Body)

            log.Println("Fetch Keys From NoSQL URL:>", url,
            "\nresponse Status:", resp.Status,
            "\n\tresponse Headers:", resp.Header)

            if strings.Contains(resp.Status, "200") {
                var results []map[string]interface{}
                json.Unmarshal(body, &results)

                // Extract All keys
                keys := []string{}
                for _, result := range results {
                    if val, ok := result["key"].(string); ok {keys = append(keys, val)}
                }

                return keys, nil
            } else {
            return []string{}, errors.New("Response 400")
            }
}

func fetchFromNoSQL(key string) (eventShortenedLink, error) {
            url := nosql_connect + "api/" + key
//             url := nosql_connect + "/Uncomment this if testing mysql fetching"

            req, err := http.NewRequest("GET", url, nil)
            req.Header.Add("Accept", "application/json")
//             req.Header.Set("Content-Type", "application/json")

            client := &http.Client{}
            resp, err := client.Do(req)
            errorLogging(err, "Failed to Fetch from NoSQL")
            defer resp.Body.Close()

            body, _ := ioutil.ReadAll(resp.Body)

            if strings.Contains(resp.Status, "200") {
                var res eventShortenedLink
                json.Unmarshal(body, &res)
                return res, nil
            } else {
                return eventShortenedLink{}, errors.New("Response 400")
            }
}


func extractAllKeywordEvents(keyword string) ([]eventShortenedLink, error) {
    results, err := fetchAllFromNoSQL()
    if err != nil {
        return results, err
    }

    indices := []int{}
    var extracted []eventShortenedLink

    for idx, result := range results {
        if result.Event == keyword {
        indices = append(indices, idx)
        }
    }

    for _, idx := range indices {extracted = append(extracted, results[idx])}

    return extracted, nil
}

func extractClickEventsWithLink(shortened_link string) ([]eventShortenedLink, error) {
    results, err := fetchAllFromNoSQL()
    if err != nil {
        return results, err
    }

    indices := []int{}
    var extracted []eventShortenedLink

    for idx, result := range results {
        if result.Event == "Click" && result.Shortened == shortened_link {
        indices = append(indices, idx)
        }
    }

    for _, idx := range indices {extracted = append(extracted, results[idx])}

    return extracted, nil
}
