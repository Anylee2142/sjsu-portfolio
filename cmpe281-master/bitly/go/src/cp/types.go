/*
	Gumball API in Go (Version 1)
	Basic Version with no Backend Services
*/

package main

import (
    "crypto/md5"
    "encoding/hex"
    "time"
    "strings"
    "github.com/satori/go.uuid"
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

func GetMD5Hash(text string) string {
    hasher := md5.New()
    hasher.Write([]byte(text))
    return hex.EncodeToString(hasher.Sum(nil))[0:10]
}

func shortenLink(o originalLink) shortenedLink {
    uuid, _ := uuid.NewV4()
    generatedUuid := uuid.String()

    if !strings.Contains(o.Original, "http://") || !strings.Contains(o.Original, "http://") {
        o.Original = "http://" + o.Original
    }

    return shortenedLink{
               Uuid:       generatedUuid,
               Original:       o.Original,
               Shortened:         GetMD5Hash(generatedUuid + o.Original),
               Time:           time.Now().String(),
           }
}