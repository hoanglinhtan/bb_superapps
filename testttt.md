High
SQL Injection - MsSQL
Description
SQL injection may be possible.
URL https://pjm-sec.cedapps.com/lib/kendo/js/kendo.all.min.js?v=wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98
Method GET
Parameter v
Attack wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98) WAITFOR DELAY '0:0:15' (
Evidence
Other Info The query time is controllable using parameter value [wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98) WAITFOR DELAY '0:0:15' (], which caused the request to take [48,143] milliseconds, when the original unmodified query with value [wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98] took [0] milliseconds.
Show / hide Request and Response
Request Header - size: 7,463 bytes.
Request Body - size: 0 bytes.
Response Header - size: 484 bytes.
Response Body - size: 3,910,172 bytes.
Instances 1
Solution
Do not trust client side input, even if there is client side validation in place.

In general, type check all data on the server side.

If the application uses JDBC, use PreparedStatement or CallableStatement, with parameters passed by '?'

If the application uses ASP, use ADO Command Objects with strong type checking and parameterized queries.

If database Stored Procedures can be used, use them.

Do _not_ concatenate strings into queries in the stored procedure, or use 'exec', 'exec immediate', or equivalent functionality!

Do not create dynamic SQL queries using simple string concatenation.

Escape all data received from the client.

Apply an 'allow list' of allowed characters, or a 'deny list' of disallowed characters in user input.

Apply the principle of least privilege by using the least privileged database user possible.

In particular, avoid using the 'sa' or 'db-owner' database users. This does not eliminate SQL injection, but minimizes its impact.

Grant the minimum database access that is necessary for the application.
Reference https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
Tags POLICY_SEQUENCE =
OWASP_2021_A03
CWE-89
WSTG-v42-INPV-05
POLICY_DEV_FULL =
POLICY_QA_STD =
POLICY_QA_FULL =
OWASP_2017_A01
CWE Id 89
WASC Id 19
Plugin Id 40027
High
SQL Injection - Oracle - Time Based
Description
SQL injection may be possible.
URL https://pjm-sec.cedapps.com/lib/kendo/js/kendo.all.min.js?v=wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98
Method GET
Parameter v
Attack field: [v], value [wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98 / (SELECT UTL_INADDR.get_host_name('10.0.0.1') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.2') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.3') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.4') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.5') from dual) ]
Evidence
Other Info The query time is controllable using parameter value [wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98 / (SELECT UTL_INADDR.get_host_name('10.0.0.1') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.2') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.3') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.4') from dual union SELECT UTL_INADDR.get_host_name('10.0.0.5') from dual) ], which caused the request to take [32,876] milliseconds, when the original unmodified query with value [wWaqI40rB5ipaEwNiYOa7p9MpDsUKsHNEUtn3uxbC98] took [27,665] milliseconds.
Show / hide Request and Response
Request Header - size: 7,775 bytes.
Request Body - size: 0 bytes.
Response Header - size: 484 bytes.
Response Body - size: 3,910,172 bytes.
Instances 1
Solution
Do not trust client side input, even if there is client side validation in place.

In general, type check all data on the server side.

If the application uses JDBC, use PreparedStatement or CallableStatement, with parameters passed by '?'

If the application uses ASP, use ADO Command Objects with strong type checking and parameterized queries.

If database Stored Procedures can be used, use them.

Do _not_ concatenate strings into queries in the stored procedure, or use 'exec', 'exec immediate', or equivalent functionality!

Do not create dynamic SQL queries using simple string concatenation.

Escape all data received from the client.

Apply an 'allow list' of allowed characters, or a 'deny list' of disallowed characters in user input.

Apply the principle of least privilege by using the least privileged database user possible.

In particular, avoid using the 'sa' or 'db-owner' database users. This does not eliminate SQL injection, but minimizes its impact.

Grant the minimum database access that is necessary for the application.
Reference https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
Tags POLICY_SEQUENCE =
OWASP_2021_A03
CWE-89
WSTG-v42-INPV-05
POLICY_DEV_FULL =
POLICY_QA_STD =
POLICY_QA_FULL =
OWASP_2017_A01
CWE Id 89
WASC Id 19
Plugin Id 40021
High
SQL Injection - SQLite
Description
SQL injection may be possible.
URL https://pjm-sec.cedapps.com/css/common.css?v=ON1f5k_8JgPRQJbmPv2LZlY9DdDRnRCDzpWsaClf5bY
Method GET
Parameter v
Attack case randomblob(100000) when not null then 1 else 1 end
Evidence The query time is controllable using parameter value [case randomblob(100000) when not null then 1 else 1 end ], which caused the request to take [254] milliseconds, parameter value [case randomblob(1000000) when not null then 1 else 1 end ], which caused the request to take [748] milliseconds, when the original unmodified query with value [ON1f5k_8JgPRQJbmPv2LZlY9DdDRnRCDzpWsaClf5bY] took [247] milliseconds.
Other Info The query time is controllable using parameter value [case randomblob(100000) when not null then 1 else 1 end ], which caused the request to take [254] milliseconds, parameter value [case randomblob(1000000) when not null then 1 else 1 end ], which caused the request to take [748] milliseconds, when the original unmodified query with value [ON1f5k_8JgPRQJbmPv2LZlY9DdDRnRCDzpWsaClf5bY] took [247] milliseconds.
Show / hide Request and Response
Request Header - size: 7,456 bytes.
Request Body - size: 0 bytes.
Response Header - size: 475 bytes.
Response Body - size: 61,807 bytes.
URL https://pjm-sec.cedapps.com/lib/bootstrap/dist/css/bootstrap.min.css?v=fXqQQ_S-0wP-KXSsTjuhDWshTnD3rlSXhrotNH3gX4E
Method GET
Parameter v
Attack case randomblob(10000000) when not null then 1 else 1 end
Evidence The query time is controllable using parameter value [case randomblob(10000000) when not null then 1 else 1 end ], which caused the request to take [1,774] milliseconds, parameter value [case randomblob(100000000) when not null then 1 else 1 end ], which caused the request to take [2,745] milliseconds, when the original unmodified query with value [fXqQQ_S-0wP-KXSsTjuhDWshTnD3rlSXhrotNH3gX4E] took [1,281] milliseconds.
Other Info The query time is controllable using parameter value [case randomblob(10000000) when not null then 1 else 1 end ], which caused the request to take [1,774] milliseconds, parameter value [case randomblob(100000000) when not null then 1 else 1 end ], which caused the request to take [2,745] milliseconds, when the original unmodified query with value [fXqQQ_S-0wP-KXSsTjuhDWshTnD3rlSXhrotNH3gX4E] took [1,281] milliseconds.
Show / hide Request and Response
Request Header - size: 7,484 bytes.
Request Body - size: 0 bytes.
Response Header - size: 476 bytes.
Response Body - size: 161,415 bytes.
Instances 2
Solution
Do not trust client side input, even if there is client side validation in place.

In general, type check all data on the server side.

If the application uses JDBC, use PreparedStatement or CallableStatement, with parameters passed by '?'

If the application uses ASP, use ADO Command Objects with strong type checking and parameterized queries.

If database Stored Procedures can be used, use them.

Do _not_ concatenate strings into queries in the stored procedure, or use 'exec', 'exec immediate', or equivalent functionality!

Do not create dynamic SQL queries using simple string concatenation.

Escape all data received from the client.

Apply an 'allow list' of allowed characters, or a 'deny list' of disallowed characters in user input.

Apply the principle of least privilege by using the least privileged database user possible.

In particular, avoid using the 'sa' or 'db-owner' database users. This does not eliminate SQL injection, but minimizes its impact.

Grant the minimum database access that is necessary for the application.
Reference https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
Tags OWASP_2017_A01
OWASP_2021_A03
CWE-89
WSTG-v42-INPV-05
POLICY_QA_FULL =
CWE Id 89
WASC Id 19
Plugin Id 40024
High
Vulnerable JS Library
Description
The identified library appears to be vulnerable.
URL https://pjm-sec.cedapps.com/lib/jquery-validation/dist/jquery.validate.min.js?v=eItLFOyfQ4d_OGzEnGchi2ZMVF8EhGgzS0k7fSOPifQ
Method GET
Parameter
Attack
Evidence /_! jQuery Validation Plugin - v1.17.0
Other Info The identified library jquery-validation, version 1.17.0 is vulnerable. CVE-2022-31147 CVE-2021-21252 CVE-2021-43306 https://github.com/jquery-validation/jquery-validation/blob/master/changelog.md#1194--2022-05-19 https://github.com/jquery-validation/jquery-validation/commit/5bbd80d27fc6b607d2f7f106c89522051a9fb0dd https://github.com/advisories/GHSA-ffmh-x56j-9rc3 https://github.com/jquery-validation/jquery-validation/blob/master/changelog.md#1200--2023-10-10 https://github.com/jquery-validation/jquery-validation/blob/master/changelog.md#1193--2021-01-09
Show / hide Request and Response
Request Header - size: 7,445 bytes.
Request Body - size: 0 bytes.
Response Header - size: 482 bytes.
Response Body - size: 23,264 bytes.
URL https://pjm-sec.cedapps.com/lib/moment.js/2.24.0/moment.min.js?v=V0ANagF6DFNCEH-GWsSDOtm_PGoP8w_oDUCzoiabAws
Method GET
Parameter
Attack
Evidence /moment.js/2.24.0/moment.min.js
Other Info The identified library moment.js, version 2.24.0 is vulnerable. CVE-2022-31129 CVE-2022-24785 https://github.com/moment/moment/security/advisories/GHSA-wc69-rhjr-hc9g https://security.snyk.io/vuln/SNYK-JS-MOMENT-2944238 https://github.com/moment/moment/security/advisories/GHSA-8hfj-j24r-96c4
Show / hide Request and Response
Request Header - size: 7,430 bytes.
Request Body - size: 0 bytes.
Response Header - size: 482 bytes.
Response Body - size: 53,327 bytes.
Instances 2
Solution
Upgrade to the latest version of the affected library.
Reference https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/
Tags OWASP_2017_A09
CVE-2022-31147
CVE-2021-43306
CVE-2021-21252
OWASP_2021_A06
CWE-1395
CWE Id 1395
WASC Id
Plugin Id 10003
Medium
Content Security Policy (CSP) Header Not Set
Description
Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware. CSP provides a set of standard HTTP headers that allow website owners to declare approved sources of content that browsers should be allowed to load on that page — covered types are JavaScript, CSS, HTML frames, fonts, images and embeddable objects such as Java applets, ActiveX, audio and video files.
URL https://pjm-sec.cedapps.com/
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 653 bytes.
Request Body - size: 0 bytes.
Response Header - size: 754 bytes.
Response Body - size: 11,534 bytes.
URL https://pjm-sec.cedapps.com/Home
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,228 bytes.
Request Body - size: 0 bytes.
Response Header - size: 774 bytes.
Response Body - size: 56,698 bytes.
Instances 2
Solution
Ensure that your web server, application server, load balancer, etc. is configured to set the Content-Security-Policy header.
Reference https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy
https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
https://www.w3.org/TR/CSP/
https://w3c.github.io/webappsec-csp/
https://web.dev/articles/csp
https://caniuse.com/#feat=contentsecuritypolicy
https://content-security-policy.com/
Tags CWE-693
OWASP_2021_A05
OWASP_2017_A06
CWE Id 693
WASC Id 15
Plugin Id 10038
Medium
Multiple X-Frame-Options Header Entries
Description
X-Frame-Options (XFO) headers were found, a response with multiple XFO header entries may not be predictably treated by all user-agents.
URL https://pjm-sec.cedapps.com/Home
Method GET
Parameter x-frame-options
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,228 bytes.
Request Body - size: 0 bytes.
Response Header - size: 774 bytes.
Response Body - size: 56,698 bytes.
Instances 1
Solution
Ensure only a single X-Frame-Options header is present in the response.
Reference https://tools.ietf.org/html/rfc7034
Tags WSTG-v42-CLNT-09
OWASP_2021_A05
OWASP_2017_A06
CWE-1021
CWE Id 1021
WASC Id 15
Plugin Id 10020
Medium
Vulnerable JS Library
Description
The identified library appears to be vulnerable.
URL https://pjm-sec.cedapps.com/lib/bootstrap/dist/js/bootstrap.min.js
Method GET
Parameter
Attack
Evidence _ Bootstrap v4.6.0
Other Info The identified library bootstrap, version 4.6.0 is vulnerable. CVE-2024-6531 https://www.herodevs.com/vulnerability-directory/cve-2024-6531 https://github.com/advisories/GHSA-vc8w-jr9v-vj7f https://nvd.nist.gov/vuln/detail/CVE-2024-6531 https://github.com/rubysec/ruby-advisory-db/blob/master/gems/bootstrap/CVE-2024-6531.yml https://github.com/twbs/bootstrap
Show / hide Request and Response
Request Header - size: 762 bytes.
Request Body - size: 0 bytes.
Response Header - size: 482 bytes.
Response Body - size: 63,473 bytes.
URL https://pjm-sec.cedapps.com/lib/bootstrap/dist/js/bootstrap.min.js?v=pFVdje6fityXboSpff6H5r9XlLV59Ju1bxM_7YX31wk
Method GET
Parameter
Attack
Evidence _ Bootstrap v4.6.0
Other Info The identified library bootstrap, version 4.6.0 is vulnerable. CVE-2024-6531 https://www.herodevs.com/vulnerability-directory/cve-2024-6531 https://github.com/advisories/GHSA-vc8w-jr9v-vj7f https://nvd.nist.gov/vuln/detail/CVE-2024-6531 https://github.com/rubysec/ruby-advisory-db/blob/master/gems/bootstrap/CVE-2024-6531.yml https://github.com/twbs/bootstrap
Show / hide Request and Response
Request Header - size: 7,434 bytes.
Request Body - size: 0 bytes.
Response Header - size: 482 bytes.
Response Body - size: 63,473 bytes.
URL https://pjm-sec.cedapps.com/lib/jquery-ui/jquery-ui.min.js?v=b1TimqX5DHR9T0W6hRpkPWWq6eP4YFFKpzGSsStXo2I
Method GET
Parameter
Attack
Evidence /_! jQuery UI - v1.12.1
Other Info The identified library jquery-ui, version 1.12.1 is vulnerable. CVE-2021-41184 CVE-2021-41183 CVE-2021-41182 CVE-2022-31160 https://github.com/advisories/GHSA-h6gj-6jjq-h8g9 https://bugs.jqueryui.com/ticket/15284 https://github.com/jquery/jquery-ui/commit/8cc5bae1caa1fcf96bf5862c5646c787020ba3f9 https://nvd.nist.gov/vuln/detail/CVE-2022-31160 https://github.com/jquery/jquery-ui/security/advisories/GHSA-gpqq-952q-5327 https://nvd.nist.gov/vuln/detail/CVE-2021-41184 https://nvd.nist.gov/vuln/detail/CVE-2021-41183 https://github.com/jquery/jquery-ui/security/advisories/GHSA-9gj3-hwp5-pmwc https://nvd.nist.gov/vuln/detail/CVE-2021-41182 https://github.com/jquery/jquery-ui/issues/2101
Show / hide Request and Response
Request Header - size: 7,426 bytes.
Request Body - size: 0 bytes.
Response Header - size: 483 bytes.
Response Body - size: 253,680 bytes.
URL https://pjm-sec.cedapps.com/lib/jquery/dist/jquery-3.4.1.min.js
Method GET
Parameter
Attack
Evidence jquery-3.4.1.min.js
Other Info The identified library jquery, version 3.4.1 is vulnerable. CVE-2020-11023 CVE-2020-11022 https://blog.jquery.com/2020/04/10/jquery-3-5-0-released/
Show / hide Request and Response
Request Header - size: 759 bytes.
Request Body - size: 0 bytes.
Response Header - size: 482 bytes.
Response Body - size: 88,131 bytes.
Instances 4
Solution
Upgrade to the latest version of the affected library.
Reference https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/
Tags OWASP_2017_A09
CVE-2024-6531
OWASP_2021_A06
CWE-1395
CWE Id 1395
WASC Id
Plugin Id 10003
Low
Cookie with SameSite Attribute None
Description
A cookie has been set with its SameSite attribute set to "none", which means that the cookie can be sent as a result of a 'cross-site' request. The SameSite attribute is an effective counter measure to cross-site request forgery, cross-site script inclusion, and timing attacks.
URL https://pjm-sec.cedapps.com/
Method GET
Parameter .AspNetCore.Session
Attack
Evidence Set-Cookie: .AspNetCore.Session
Other Info
Show / hide Request and Response
Request Header - size: 653 bytes.
Request Body - size: 0 bytes.
Response Header - size: 754 bytes.
Response Body - size: 11,534 bytes.
URL https://pjm-sec.cedapps.com/Home
Method GET
Parameter .AspNetCore.Correlation.9ckJX9hp4gN45up2oMgC7CogDxZGu0SjmSHeMHvaYUc
Attack
Evidence Set-Cookie: .AspNetCore.Correlation.9ckJX9hp4gN45up2oMgC7CogDxZGu0SjmSHeMHvaYUc
Other Info
Show / hide Request and Response
Request Header - size: 719 bytes.
Request Body - size: 0 bytes.
Response Header - size: 1,800 bytes.
Response Body - size: 0 bytes.
URL https://pjm-sec.cedapps.com/Home
Method GET
Parameter .AspNetCore.OpenIdConnect.Nonce.CfDJ8MqhsCsHBHBHs2S_fq2FkdP6_XUqC7-Mqv5ruX9DbXAHt1tokv89HOlsKF3Sms25LKsvavrpYSodXHKxIDoHIE6NUBquaozPjcJ3yyVE1IqXS4zYG2fvDnsL5KL2aN_a8Icy9o6Bj7gyFn-zo4EX5-13tep-3ZbIAtoA71IXDf7233dPmztEWfShFgnS-Vby80jGiflfiqficC4Voc2S376gvQ85ZEX7RRdTshCEb1ik4odrDAN4OhJFu52Uduvkhn1JaEFF9uL_yTS9AJm0jIQ
Attack
Evidence Set-Cookie: .AspNetCore.OpenIdConnect.Nonce.CfDJ8MqhsCsHBHBHs2S_fq2FkdP6_XUqC7-Mqv5ruX9DbXAHt1tokv89HOlsKF3Sms25LKsvavrpYSodXHKxIDoHIE6NUBquaozPjcJ3yyVE1IqXS4zYG2fvDnsL5KL2aN_a8Icy9o6Bj7gyFn-zo4EX5-13tep-3ZbIAtoA71IXDf7233dPmztEWfShFgnS-Vby80jGiflfiqficC4Voc2S376gvQ85ZEX7RRdTshCEb1ik4odrDAN4OhJFu52Uduvkhn1JaEFF9uL_yTS9AJm0jIQ
Other Info
Show / hide Request and Response
Request Header - size: 719 bytes.
Request Body - size: 0 bytes.
Response Header - size: 1,800 bytes.
Response Body - size: 0 bytes.
Instances 3
Solution
Ensure that the SameSite attribute is set to either 'lax' or ideally 'strict' for all cookies.
Reference https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site
Tags OWASP_2021_A01
OWASP_2017_A05
WSTG-v42-SESS-02
CWE-1275
CWE Id 1275
WASC Id 13
Plugin Id 10054
Low
Server Leaks Version Information via "Server" HTTP Response Header Field
Description
The web/application server is leaking version information via the "Server" HTTP response header. Access to such information may facilitate attackers identifying other vulnerabilities your web/application server is subject to.
URL https://pjm-sec.cedapps.com/
Method GET
Parameter
Attack
Evidence Microsoft-IIS/10.0
Other Info
Show / hide Request and Response
Request Header - size: 653 bytes.
Request Body - size: 0 bytes.
Response Header - size: 754 bytes.
Response Body - size: 11,534 bytes.

Low
Strict-Transport-Security Multiple Header Entries (Non-compliant with Spec)
Description
HTTP Strict Transport Security (HSTS) headers were found, a response with multiple HSTS header entries is not compliant with the specification (RFC 6797) and only the first HSTS header will be processed others will be ignored by user agents or the HSTS policy may be incorrectly applied.

HTTP Strict Transport Security (HSTS) is a web security policy mechanism whereby a web server declares that complying user agents (such as a web browser) are to interact with it using only secure HTTPS connections (i.e. HTTP layered over TLS/SSL).
URL https://pjm-sec.cedapps.com/
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 653 bytes.
Request Body - size: 0 bytes.
Response Header - size: 754 bytes.
Response Body - size: 11,534 bytes.
URL https://pjm-sec.cedapps.com/Home
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,228 bytes.
Request Body - size: 0 bytes.
Response Header - size: 774 bytes.
Response Body - size: 56,698 bytes.
URL https://pjm-sec.cedapps.com/Home/GetLinksLibrary
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,671 bytes.
Request Body - size: 0 bytes.
Response Header - size: 466 bytes.
Response Body - size: 5,971 bytes.
URL https://pjm-sec.cedapps.com/Home/GetListFollowingProject
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,679 bytes.
Request Body - size: 0 bytes.
Response Header - size: 463 bytes.
Response Body - size: 2 bytes.
URL https://pjm-sec.cedapps.com/Home/GetListFollowingStorageProject
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,686 bytes.
Request Body - size: 0 bytes.
Response Header - size: 463 bytes.
Response Body - size: 2 bytes.
URL https://pjm-sec.cedapps.com/Home/GetListFollowingTracker
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,679 bytes.
Request Body - size: 0 bytes.
Response Header - size: 463 bytes.
Response Body - size: 2 bytes.
URL https://pjm-sec.cedapps.com/Home/GetListSBOCalendar
Method GET
Parameter
Attack
Evidence
Other Info
Show / hide Request and Response
Request Header - size: 7,674 bytes.
Request Body - size: 0 bytes.
Response Header - size: 465 bytes.
Response Body - size: 113 bytes.
Instances 7
Solution
Ensure that only one component in your stack: code, web server, application server, load balancer, etc. is configured to set or add a HTTP Strict-Transport-Security (HSTS) header.
Reference https://datatracker.ietf.org/doc/html/rfc6797#section-8.1
Tags OWASP_2021_A05
OWASP_2017_A06
CWE-319
CWE Id 319
WASC Id 15
Plugin Id 10035
