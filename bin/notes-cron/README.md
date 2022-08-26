# Notes Cron
This script mutates text files based on template functions within the text. The format is `fnName(param ~ value)`. Available functions:

- age: `Seth is age(June 2021)` -> `Seth is age(June 2021 ~ six months old)`
- ago: `They moved here ago(June 2021)` -> `They moved here ago(June 2021 ~ six months ago)`
- for: `Has been working there for(June 2021)` -> `Has been working there for(June 2021 ~ Siz months)`
- remind: `remind(June 2023 ~ Message Felix to ask how the baby is doing)` -> `reminded(June 2023 ~ Message Felix to ask how the baby is doing)`
  - this function sends reminder on the first run on/after the specified date
  - after reminder is sent, template string is changed to `reminded(...`

It is also capable of creating and sending a Daily Digest, which contains a randomized assortment of pages/paragraphs tagges with: [box1] (most items in digest), [box2], [box3] (least items in digest)