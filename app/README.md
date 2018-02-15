# Intern Coding Challenge

Zendesk has a customer support product that allows creation and management of support tickets. Your company has been asked to build a Ticket Viewer application.

## Functional Requirements
* Connect to the Zendesk API.
* Request all the tickets for your account.
* Display them in a list.
* Display individual ticket details.
* Page through tickets when more than 25 are returned.
* The Ticket Viewer should handle the API being unavailable.

## Non-functional Requirements
* Include a README with installation and usage instructions.
* The UI can be browser-based or CLI.
* The amount of data you display in the bulk ticket view and the single ticket view is up to you.
* How you format and display the ticket data is up to you, just ensure it is easy to read.
* We need to see you write at least a few happy path tests.

## Criteria for Assessment

* Meets requirements:
  * No extra features are added. 
  * All required features have been attempted.
* Displays some knowledge of application design:
  * Separation of concerns.
  * Simplicity.
* Handles basic errors:
  * Displays a friendly error message if the API is unavailable or the response is invalid.
  * Tells the user something is wrong if there is a program error.
* Includes tests. 
* UI is easy to use and displays ticket results clearly.
* Code demonstrates:
  * Consistency.
  * Adherence to common standards.
 
## Getting Started
* Sign up for a free trial with Zendesk: https://zendesk.com/. You’ll need to pick an account name. Take note of this, you’ll need it later.
* Take a look at the Zendesk Ticket API Documentation: https://developer.zendesk.com/rest_api/docs. Here you’ll find instructions on how to connect to the API and make requests for tickets.
* Optionally create some sample ticket data, as outlined below.

### Creating Ticket Data
* Download the `tickets.json` file in this gist.
* Use the `cURL` command below to `POST` the in this file to your new Zendesk account. You'll need to replace the , `{email}` , and `{password}` placeholders with the relevant details for your own Zendesk account.

    If you're not familiar with `cURL` , feel free to use whatever means you like to make the request. [Postman](https://www.getpostman.com/) is an easy option.	

    ```sh
    curl https://{subdomain}.zendesk.com/api/v2/imports/tickets/create_many.json -v -u {email_address}:{password} -X POST -d @tickets.json -H "Content-Type:application/json"
    ```

    **NOTE:**
    * The `cURL` command expects that a `tickets.json` file will be in the current working directory when the command is run.
    * When called, the Ticket Import API will kick off a job that may take some time to complete. You can call the [Job Status API](https://developer.zendesk.com/rest_api/docs/core/job_statuses#show-job-status) to get the current status of the job.
    * You can find additional information about the [Ticket Import API here](https://developer.zendesk.com/rest_api/docs/core/ticket_import).

That's it! Good luck with the challenge.

### Gotchas
* **Do Not Use** Javascript in the browser (running on Node is fine). You won’t be able to successfully complete a GET request as we prevent cross-domain requests. 
* Remember that even though the response comes back as JSON format it is still just a string and needs to be parsed to be of any use to you.
* Use basic authentication.
