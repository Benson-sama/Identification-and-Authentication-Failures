# Bug: Account authentificationa and security vulnerability (#0000000000001)

### Author: Christy Kariyampalli

### Date : 18.May.2023

## Pritority

10/10 - Critical, due to account being easily hackable and missing authentification "method" to hinder
over creation of accounts.

## Platform/Environment

Device: Windows 10 (21H1).

Browsers: Firefox & Chrome

## Description

Following bug contained no verification for secure passwords and other methods of authentification such as an email address.

## Steps to Reproduce

Open registration form -> Create user with weak password e.g. one character.

## Expected/Actual Result and Solution

### Excepected

User create accounts with email and strong password.

### Actual

User can be created with weak password and without any other authentification types.

### Solution

1. Email Input added to the registration form.
2. Database and classes modified to handle credentials with containing email of account-holder.
3. Password check with regular expression on its length and containing characters to ensure a user puts in a secure password.
4. Email address check with regular expression.
