# Notes Cron
This script mutates text files based on template functions within the text. The format is `fnName(param ~ value)`. Available functions:

## Template Functions
- age: `Seth is age(June 2021)` -> `Seth is age(June 2021 ~ six months old)`
- ago: `They moved here ago(June 2021)` -> `They moved here ago(June 2021 ~ six months ago)`
- for: `Has been working there for(June 2021)` -> `Has been working there for(June 2021 ~ Siz months)`
- remind: `remind(June 2023 ~ Message Felix to ask how the baby is doing)` -> `reminded(June 2023 ~ Message Felix to ask how the baby is doing)`
  - this function sends reminder on the first run on/after the specified date
  - after reminder is sent, template string is changed to `reminded(...`

## Daily Digest
Daily Digest sends a curated daily email containing a randomized assortment of pages/paragraphs tagges with: [box1] (most items in digest), [box2], [box3] (least items in digest)

## Setup
- Required env variables are in `.env.example`
- Also `$NOTES_PATH`, `$EMAIL`, `$PHONE_NUMBER`.
  - These should be set before running `run.sh`
- Run by setting a crontab like this: `00 06 * * * /bin/zsh ts-node ~/.dotfiles/bin/notes-cron/index.ts >> ~/.crontab.log 2>&1`
  - Check system time first by running `date` - it may be on UTC

## TODO
- Update crontab
- Move `index.ts -> runTemplateFunctions` to a new class `TemplateFunctions`, mirror logic with `DailyDigest` class as much as possible
- Maybe don't pass dateTimeClient to the DateTime class, it adds too much complexity. DateTime can probably just use Momemt.js all the time, and we can mock DateTime's 'moment' dependency with jest.mock.