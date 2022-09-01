# Photo Rename

This renames photos to the date they were taken, optionally sorting them into folders based on year and month

## Process for sorting/editing/archiving things

- Dump photos/videos (from either phone, or the camera) into 'Photo Dump'
- Run rename script to rename everything by date
- Process Videos
  - Sort by 'type:movie', then sort by size and delete any accidental short clips
  - Move all videos to 'To USB'
  - TODO: in the future, it would be worth zipping entire year's USB and moving to AWS Deep Glacier when the USB is completed
- Process Photos
  - Delete unwanted photos...oof this is the annoying part. Mac Finder Gallery View seems to be the most efficient way so far, and it handles .cr2 files about as well as DxO PhotoLab
  - Process photos with DxO as needed
    - load whole 'Photo Dump' folder, filter by all .cr2 files and any starred .jpg
  - Save large .jpg to 'Photo Dump' folder
    - Sort by date modified
      - Add some photos to mom's frame
      - Delete all .dop files
  - Save small .jpg to 'To Google Drive'
- Process Notes
  - run `~/.dotfiles/bin/notes-zip`
  - result should go in USB and Google Drive folders named 'Backups', along with whatever else we want to archive
- Copy to USB and to Google Drive in correct folders (making a sort script probably isn't worth it, as it's more work to copy from multiple dirs than just selecting the correct photos, esp. for Google Drive).