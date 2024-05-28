---
title: Getting Started
description: Learn how to create an account on the UID2 Portal.
hide_table_of_contents: false
sidebar_position: 03
---

import Link from '@docusaurus/Link';

# Getting Started with the UID2 Portal

As part of requesting a UID2 Portal account, you must provide your UID2 contact with some information about yourself and your company.

When we've processed your request, we'll send you a confirmation email that will allow you to log in to the UID2 Portal and verify your account details, set up participants and teams, and configure your settings for UID2 sharing permissions.

For the initial steps, follow these instructions:

- [Request Account](#request-account)
- [Logging In for the First Time](#logging-in-for-the-first-time)
- [Changing Your Password](#changing-your-password)

If at any time you need assistance with the onboarding process, ask your UID2 contact.

## Request Account

There's some information you'll need to provide to your UID2 contact with your account request. Include the details listed in the following table.

| Item | Details |
| :--- | :--- |
| Information about yourself | Provide the following:<br/>- First name<br/>- Last name<br/>- Email<br/>- Job function |
| Information about your company | Provide the following:<br/>- Participant name (Company name)<br/>- Participant type (for example, DSP) |

## Account Approval

Once you've requested access, your UID2 contact processes the request. When the approval process is complete and your account has been created, you'll receive a confirmation email with a link to log in to the UID2 Portal.

## Prepare Setup Information

There's some additional information that you'll need so that, when we've created your account, you can configure it. The configuration steps vary according to your role and your implementation scenario. To be ready, review the following sections and prepare any information needed:

- [Determine Integration Path](#determine-integration-path)

  :::tip
  For a client-side implementation, you'll need a full list of your root-level domains.
  :::
- [Set Up Team Members and Email Contacts](#set-up-team-members-and-email-contacts)

## Determine Integration Path

The values you'll receive to identify your account, and the setup actions, are different depending on your integration path.

There are two main options, as shown in the following table.

| Integration | Details | Instructions |
| :--- | :--- | :--- |
| Client-side integration | Tokens are generated on the client side. |  Go to the **Client-Side Integration** page and set up key pairs and root-level domains. We use these to identify your transactions.<br/>For details, see [Client-Side Integration](client-side-integration.md). |
| Client-server integration | Tokens are generated on the server side and refreshed on the client side. | Go to the **API Keys** page and create at least one set of credentials. When you add an API key, you're assigned two values, a secret and a key, which you'll use in your implementation.<br/>For details, see [API Keys](api-keys.md). |

## Log In for the First Time

When you receive the confirmation email, click the **Accept Invitation** link in the email to get started, then click through to complete these tasks:
- [Change your password](#change-your-password)
- [Log In](#log-in)
- [Configure your account](#configure-your-account)

Create a new password, and then log into the UID2 Portal.

## Change Your Password

The **Accept Invitation** link takes you to the **Update Password** page.

:::tip
 If you're changing your password because you think your account might have been compromised, be sure that the **Sign out from other devices** box is checked.
:::

Type your new password, confirm, and click **Save Password**.

You'll see a notification that your account has been approved, and a **Log In** button.

## Log In

Now, you're ready to log in. 

1. Click the **Log In** button.

   You'll see the UID2 Sharing Portal Terms of Service. 

2. Review as needed, scroll to the bottom, and then click **Accept Terms and Conditions**.

   You'll see the UID2 Portal home page.

The next step is to configure your account.

## Configure Unique Account Values

The sequence of steps for configuring your account depends on your scenario. The following is a suggested sequence.

1.  An important first step is to determine your integration path. See [Determine Integration Path](#determine-integration-path).

1.  Then, you can configure values, in the applicable page&#8212;one of the following:

    -  [Client-Side Integration](client-side-integration.md)
    - [API Keys](api-keys.md)

1.  When you have the unique values for your account, you can configure your [sharing permissions](sharing-permissions.md).

1. Adding team members will help ensure that the workload is shared across the team. See [Team Members](team-members.md).

1. Adding email contacts is another way to help ensure that anyone involved with the project is kept informed. See [Email Contacts](email-contacts.md).

## Set Up Team Members and Email Contacts

When you log in for the first time, you can complete the following configuration steps:

- Set up your team members.
- Add info for anyone who should receive notifications about the latest updates and releases for UID2.

The following table includes details of the information you'll need, and a link to instructions.

| Item | Details | Link to Instructions | 
| :--- | :--- | :--- |
| Team member information | For each, provide the following:<br/>- First name<br/>- Last name<br/>- Email<br/>- Job function | [Team Members](team-members.md) |
| Email contact information | For each, provide the following:<br/>- Email group name<br/>- Email alias<br/>- Contact type | [Email Contacts](email-contacts.md) |

## Reset Password

If you forget your password, just click the **Forgot Password** link on the login page. Provide your email address, and then look for the password reset message in your email account.
