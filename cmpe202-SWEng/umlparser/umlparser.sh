#!/bin/bash

export UMLPARSER_LIB=$(pwd)/src

echo "!!! Note: You must fix \'-package\' to \'-private\' at the \"umlgraph\" script"

echo $1

echo "Compiling Source code and the Target code !"
javac -parameters $UMLPARSER_LIB/*.java
javac -parameters $1/*.java

echo "Parsing the target codes !"
java -cp $UMLPARSER_LIB:$1:./tests/ Main $1 $2 > debug.log

#echo "Generating UML Class Diagram !"
umlgraph $2 png

echo "Remove compiled files !"
rm $UMLPARSER_LIB/*.class
rm $1/*.class