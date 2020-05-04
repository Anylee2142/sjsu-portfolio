
package main

import (
    "log"
)

func errorLogging(err error, msg string) {
  if err != nil {
    log.Printf("%s: %s", msg, err)
  }
}
