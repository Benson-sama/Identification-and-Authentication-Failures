# Onuralp Mete Bug Report

[Bug Report Text File](BugReportIdentificationAndAuthentication_OnuralpMete.txt)


# Identification and Authentication Failures
> Previously known as Broken Authentication, this category slid down from the second position and now includes Common Weakness Enumerations (CWEs) related to identification failures. Notable CWEs included are CWE-297: Improper Validation of Certificate with Host Mismatch, CWE-287: Improper Authentication, and CWE-384: Session Fixation.

## Database Configuration
* server=127.0.0.1
* user=root
* database=auth
* password=admin
* port=3306

## WebAPI Configuration
* https://localhost:7237

## Factors
| CWEs Mapped |	Max Incidence Rate |	Avg Incidence Rate |	Avg Weighted Exploit |	Avg Weighted Impact |	Max Coverage |	Avg Coverage |	Total Occurrences |	Total CVEs |
|-------------|--------------------|--------------------|----------------------|---------------------|--------------|--------------|-------------------|------------|
|     22      |        14.84%      |        2.55%       |          7.40        |          6.50       |    79.51%    |    45.72%    |      132,195      |    3,897   |

## Description
Confirmation of the user's identity, authentication, and session management is critical to protect against authentication-related attacks. There may be authentication weaknesses if the application:

* Permits automated attacks such as credential stuffing, where the attacker has a list of valid usernames and passwords.
* Permits brute force or other automated attacks.
* Permits default, weak, or well-known passwords, such as "Password1" or "admin/admin".
* Uses weak or ineffective credential recovery and forgot-password processes, such as "knowledge-based answers," which cannot be made safe.
* Uses plain text, encrypted, or weakly hashed passwords data stores (see [A02:2021-Cryptographic Failures](https://owasp.org/Top10/A02_2021-Cryptographic_Failures/)).
* Has missing or ineffective multi-factor authentication.
* Exposes session identifier in the URL.
* Reuse session identifier after successful login.
* Does not correctly invalidate Session IDs. User sessions or authentication tokens (mainly single sign-on (SSO) tokens) aren't properly invalidated during logout or a period of inactivity.

## How to Prevent
* Where possible, implement multi-factor authentication to prevent automated credential stuffing, brute force, and stolen credential reuse attacks.
* Do not ship or deploy with any default credentials, particularly for admin users.
* Implement weak password checks, such as testing new or changed passwords against the top 10,000 worst passwords list.
* Align password length, complexity, and rotation policies with National Institute of Standards and Technology (NIST) 800-63b's guidelines in section 5.1.1 for Memorized Secrets or other modern, evidence-based password policies.
* Ensure registration, credential recovery, and API pathways are hardened against account enumeration attacks by using the same messages for all outcomes.
* Limit or increasingly delay failed login attempts, but be careful not to create a denial of service scenario. Log all failures and alert administrators when credential stuffing, brute force, or other attacks are detected.
* Use a server-side, secure, built-in session manager that generates a new random session ID with high entropy after login. Session identifier should not be in the URL, be securely stored, and invalidated after logout, idle, and absolute timeouts.

## Example Attack Scenarios
**Scenario #1:** Credential stuffing, the use of lists of known passwords, is a common attack. Suppose an application does not implement automated threat or credential stuffing protection. In that case, the application can be used as a password oracle to determine if the credentials are valid.

**Scenario #2:** Most authentication attacks occur due to the continued use of passwords as a sole factor. Once considered best practices, password rotation and complexity requirements encourage users to use and reuse weak passwords. Organizations are recommended to stop these practices per NIST 800-63 and use multi-factor authentication.

**Scenario #3:** Application session timeouts aren't set correctly. A user uses a public computer to access an application. Instead of selecting "logout," the user simply closes the browser tab and walks away. An attacker uses the same browser an hour later, and the user is still authenticated.

[Source, 27 April 2023](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)
