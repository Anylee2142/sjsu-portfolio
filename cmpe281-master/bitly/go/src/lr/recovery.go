
package main

import (
    "log"
)

// Since golang doesn't support try-catch in goroutine, below function is needed
// This function wraps bug-suspected code (e.g. database connection error etc)
func safeGo(f func()) {
	go func() {
		defer func() {
			if panicMessage := recover(); panicMessage != nil {
                log.Printf("RECOVERED FROM UNHANDLED PANIC: ", panicMessage)
			}
		}()
        // Do actual task here
		f()
	}()
}