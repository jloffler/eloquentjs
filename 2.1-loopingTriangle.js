/*
Write a loop that makes seven calls to console.log to output the following triangle:

#
##
###
####
#####
######
#######
*/

const numLines = 7

let hashes = ''

while (hashes.length < numLines) {
  console.log(hashes += '#')
}