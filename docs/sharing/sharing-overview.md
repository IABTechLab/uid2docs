---
title: Overview
description: Learn about sharing UID2 information with other participants.
hide_table_of_contents: false
sidebar_position: 01
---

# Sharing UID2 Information: Overview

This page provides information about sharing UID2 information: what sharing means, who you can share with, the benefits of sharing, how to set up and manage your sharing relationships, and lots more! Use sharing relationships to expand your reach and help your business to prosper.

<!-- It includes the following:

- [xxx](#xxx)
  - [xxx](#xxx)
  - [xxx](#xxx)
- [xxx](#xxx)
  - [xxx](#xxx)
  - [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx) -->

Details to come.

Sharing is the act of securely transmitting one or more UID2 tokens from one participant to another participant or the service provider for another participant.

There are many ways to implement sharing and many advantages.

## Sharing Scenarios

Here are some ways to implement sharing:

- An advertiser (sender) sends a UID2 token to a DSP (receiver) for segment creation via an API.
- A measurement partner (sender) sends a UID2 token to an advertiser (receiver) via Amazon Simple Storage Service (S3).
- A publisher (sender) sends a UID2 token via a pixel to an advertiser (receiver).

Different types of UID2 participants have different needs, so the advantages are different depending on the type of participant. Overall, sharing can be mutually advantageous for all participants.

Overall, there are different needs for different UID2 participants. As a privacy-focused identity solution, when sending a UID2 from one participant to another or a service provider, the UID2 must be encrypted (except for what is allowed today – sharing UID2s with UID2 DSPs ). For example, when a UID2 leaves a participant’s infrastructure (e.g. API endpoint) or will be accessed by another participant (e.g. Amazon s3 dump), the UID2 must be encrypted into a UID2 token. To encrypt your UID2s, you must follow the below process.

uptohere Wed 5/31 trying to get this overview written! Stashing to do the URL fixes in the PP files.

