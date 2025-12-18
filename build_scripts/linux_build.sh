#!/bin/bash
mkdir hazzy
cd hazzy
echo hiii
echo owo i am building the fox into a love file
git clone https://github.com/Drwhomust/hazzy.git
cd hazzy
git switch fixed-hazmat-suit
git pull
cd ..
mv hazzy/src .
cd src
zip -9 -r hazzy.love .
cd ..
mv src/hazzy.love .

echo finshed building hazzy love file.
echo now cleaning up!

rm -rf hazzy
rm -rf src