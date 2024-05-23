---
title: Getting Started
description: Learn how to create an account on the UID2 Portal.
hide_table_of_contents: false
sidebar_position: 03
---

import Link from '@docusaurus/Link';

# Getting Started with the UID2 Portal

As part of requesting a UID2 Portal account, you must provide some information about yourself and your company, to your UID2 contact.

Once you've initiated the request, with your UID2 contact, you'll receive a confirmation email that will allow you to log in to the UID2 Portal and finish setting up your account.

There are two steps before you can actually access the UID2 Portal:

1. You'll get a confirmation email. Click the button in the email to verify your account.
1. Your account is created. This might take a few days. When the account is ready, you'll get a confirmation email and can then go into your account to verify the details, set up participants and teams, and configure your settings for UID2 sharing permissions.

If at any time you need assistance with the onboarding process, ask your UID2 contact.

<!-- It includes the following:

- [Gather Information](#gather-information)
- [Request an Account](#request-an-account)
- [Account Approval Step](#account-approval-step)
- [Log In for the First Time](#log-in-for-the-first-time)
- [Reset Password](#reset-password) -->

## Request Account

There's some information you'll need to provide to your UID2 contact, for your account request, and some additional information you'll need to collect so that you can set up your account when it's approved.

The following tables show the information to gather up front so that you'll have it in hand when needed.

Information needed for your account request:

| Item | Details |
| :--- | :--- |
| Information about yourself | Provide the following:<br/>- First name<br/>- Last name<br/>- Email<br/>- Job function |
| Information about your company | Provide the following:<br/>- Participant name (Company name)<br/>- Participant type (for example, DSP) |

Once you've sent this information, your UID2 contact creates the account for you and sends you a confirmation email.

## Logging In for the First Time

When you receive the confirmation email, click the **Accept Invitation** link in the email to get started, then click through to complete these tasks:
- [Change your password](#change-your-password)
- [Log In for the First Time](#log-in-for-the-first-time)
- [Configure your account](#configure-your-account)

Create a new password, and then log into the UID2 Portal.

## Change Your Password

The Accept Invitation link takes you to the Update Password page.

:::tip
As a security measure, the **Sign out from other devices** box is checked. If you want to be signed in on more than one device, clear this box.

(**GWH_ question on this, what's it actually for**)
:::

Type your new password, confirm, and click **Save Password**.

You'll see a notification that your account has been approved, and a **Log In** button.

## Log In for the First Time

Now, you're ready to log in. 

1. Click the **Log In** button.

   You'll see the UID2 Sharing Portal Terms of Service. 

2. Review as needed, scroll to the bottom, and then click **Accept Terms and Conditions**.

   You'll see the UID2 Portal home page.

The next step is to configure your account.

## Configure Your Account

The sequence of steps for configuring your account depends on your scenario. The following is a suggested sequence.

1.  An important first step is to determine your integration path. See [Determine Integration Path and Configure Values](#determine-integration-path-and-configure-values).

1.  Then, you can configure values, in the applicable page&#8212;one of the following:

    -  [Client-Side Integration](client-side-integration.md)
    - [API Keys](api-keys.md)

1.  When you have the unique values for your account, you can configure your [sharing permissions](sharing-permissions.md).

1. Adding team members will help ensure that the workload is shared across the team. See [Team Members](team-members.md).

1. Adding email contacts is another way to help ensure that anyone involved with the project is kept informed. See [Email Contacts](email-contacts.md).

## Determine Integration Path and Configure Values

The values you'll receive to identify your account, and the setup actions, are different depending on your integration path.

There are two main options:

- Client-side integration: Tokens are generated on the client side.

  For this integration path, go to the **Client-Side Integration** page and set up key pairs and root-level domains. We use these to identify your transactions. For details, see [Client-Side Integration](client-side-integration.md).

- Client-server integration: Tokens are generated on the server side and refreshed on the client side.

  For this integration path, go to the **API Keys** page and create at least one set of credentials. When you add an API key, you're assigned two values, a secret and a key, which you'll use in your implementation. For details, see [API Keys](api-keys.md).  





____________________________________________________________________________________ below is old
## Request an Account

When you click the UID2 Portal link for the first time, you'll see the login page. To create your account, follow these steps:

1. Click **Request Account**.

2. On the Request Account page, provide the following information about yourself:

   - First name
   - Last name
   - Email address
   - Job function

3. Create and confirm your password and then click **Continue**.

4. The next step is email verification. We send you an email to confirm your email address. To confirm, click the button in the email.

4. On the Participant Information page, provide your company name and then, for **Participant Type**, choose one or more of the following:
 
   - Publisher
   - Advertiser
   - DSP
   - Data Provider

5. Click the **Terms and Conditions** link to review the details.

6. On the Accept Terms and Conditions page, review the terms and conditions, scrolling down to the bottom, and then click **Accept Terms and Conditions**.

   You are returned to the Participant Information page.

3. Check the box to agree to the terms and conditions, and then click **Request Account**.

When you've requested your account, your request is sent for approval. See [Account Approval Step](#account-approval-step).

## Account Approval Step

When you've requested your account including confirming your email address, your account is reviewed. The process might take a few days.

When the approval process is complete and your account has been authorized, you'll receive a confirmation email with a link to log in to the UID2 Portal.

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
