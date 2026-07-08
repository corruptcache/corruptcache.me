---
layout: layouts/post.njk
title: "Locked Out of the OPNsense GUI? Bypassing the HDMI Bug on Bare-Metal"
description: "How we fixed the innevatible firewall GUI lockout and the power of option 13."
date: 2026-07-07
image: https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3ZmMwc3dra2RndHVpdzhjc2s0cjF2NmM4bmMzbDg5YzZlamh4ZGtuaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bC8EUWeuy5OIx6o7ul/giphy.gif
image_alt: "An abstract network grid with glowing data packets and security shields, representing the intersection of networking and security."
permalink: /blog/Locked-Out-of-the-OPNsense-GUI/
tags:
  - firewall-rules
  -  OPNsense
  - networking-fundamentals
---

No matter how many tutorials you watch, what certifications you have, if you are creating firewall rules for the first time, *you **will** lock yourself out of the firewall GUI.*

And honestly, I tried to avoid it at all costs. Until it finally happened and after we fixed it, I realized it taught me more than following any guide. So if you’re currently panicking, take a breath, and see if my situation is similar to yours.

My friend [Jack](https://www.linkedin.com/in/jackgillispie/) was at the lab (my house) helping me configure my OPNsense firewall, running off an Intel N100 mini pc, when *all the sudden* the admin portal stopped responding.

![confused cat with loading animation](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDg3ZmEweGVndzg1bWF2MzY3aHd0azdlcW5ncDg5d3JqbTZvZG0xbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pY8jLmZw0ElqvVeRH4/giphy.gif)

I would be lying if I wasn’t panicking. We were both trying different stuff to fix the issue. I quickly figured we need to try one potential fix at a time and to work together to be on the same page.

## **`Failed Attempt 1:`**

Since my pc was and the AP (Jack was using wifi) was connected to the primary switch, our first thought was to bypass the managed switch entirely and plug a laptop directly into the mini pc, where the switch was originally plugged into and.. Nada, zip, nothing. We even tried plugging into the WAN port too. **The lights were on, but no one was home.**

<figure>
  <img src="/assets/images/opnsense-mini-pc.webp" alt="My OPNsense mini pc sitting on my server rack.">
  <figcaption>My awesome fanless mini-pc running OPNsense.</figcaption>
</figure>

## **`Failed Attempt 2:`**

Since OPNsense was installed on a mini pc, there is an HDMI port we can plug into. We were both surprised when we kept getting no signal on the monitor. **Close but no cigar..**

## **`The Discovery:`**

I used Gemini LLM to search the web for potential solutions and provided the context of our failed attempts, specifically the lack of output on the monitor. Using the same monitor when initially installing OPNsense, I was confused. Voilà, Gemini responded with a known OPNsense/FreeBSD quirk where hot-plugging an HDMI cable after boot will not output a signal.

### **`The Solution: Reverting OPNsense Rules via Terminal Option 13`**

After confirming Gemini’s sources and after exhausting all other possible options, we left the monitor plugged in and rebooted the mini pc. Sure enough we saw the pc’s boot screen and then quickly saw that sweet scrolling text of OPNsense starting all of its services, once again feelin’ like a hackerman.

Once OPNsense is fully up and running, you will be asked to login (must login as root) and on success, greeted with the OPNsense terminal menu. This blog will focus on *one crucial* menu option, [#13: Restore a configuration.](https://docs.opnsense.org/troubleshooting/config_reset.html)

*This beauty of an option* gives you the ability to rewind your self-induced pwn. The geniuses that make OPNsense made a feature that automagically creates a backup every time you click “Apply Changes” before committing the new state. All those backups are timestamped making it easy to go back to a previous state without losing a bunch of progress.

# What We Learned & Tips

* **<u>Communication is a debugging tool:</u>** When working on a team, concurrent, undocumented changes make root cause analysis impossible.

* **<u>Be aware of the bare metal hot-plugging quirk:</u>** if you are running OPNsense on bare metal instead of a VM, always have the monitor plugged in before booting.

* **<u> Embrace the lockout:</u>** Following guides perfectly prevents outages, but also prevents learning. Tinkering and breaking things is a necessary step to become a firewall pro and a homelab is a good low stakes environment to do so.

* **<u> Garbage in, garbage out:</u>** When using AI, generally, the response quality will mirror your prompt. Providing context makes all the difference rather than prompting “I’m locked out of the OPNsense GUI, plz fix”. Verify the output and don’t expect to one-shot to the right answer every time.

If you would like to get more updates on my homelab and be part of a cybersecurity focused community, join the [Cyber Range](https://www.skool.com/cyber-community/about?ref=0f65898a40ca42239c593970aaa16e8f) and if you do, make sure to [follow me](https://www.skool.com/@andrew-knowles-3018?t=posts) on there!


