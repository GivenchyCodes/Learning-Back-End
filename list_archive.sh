#!/usr/bin/env bash

for file in "$@"
do
    printf "\n-----\nArchive '%s'\n-----\n" "$file"
    ## Get the file's extension
    ext=${file##*.}
    ## Special case for compressed tar files. They sometimes
    ## have extensions like tar.bz2 or tar.gz etc.
    [[ "$(basename "$file" ."$ext")" =~ \.tar$ ]] && ext="tgz"

    case $ext in
        7z)
            type 7z >/dev/null 2>&1 && 7z l "$file" || 
            echo "ERROR: no 7z program installed"
            ;;
        tar|tbz|tgz)
            type tar >/dev/null 2>&1 && tar tf "$file"|| 
            echo "ERROR: no tar program installed"
            ;;
        rar)
            type rar >/dev/null 2>&1 && rar v "$file"|| 
            echo "ERROR: no rar program installed"
            ;;
        zip)
            type zip >/dev/null 2>&1 && zip -sf "$file"|| 
            echo "ERROR: no zip program installed"
            ;;
        *)
            echo "Unknown extension: '$ext', skipping..."
            ;;
    esac
done
