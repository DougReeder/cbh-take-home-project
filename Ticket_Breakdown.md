# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

* Implicit Criterion: Automated tests all continue to pass

### Ticket 1: add method `createFacilityAgent` & DB table `FacilityAgent`
#### Dependencies
none
#### Acceptance Criteria
* No change in behavior visible to other parts of the system
* New automated tests verify that a new method `createFacilityAgent` 
  * fails if not passed valid Facility ID and Agent ID
  * accepts a nullable `customId` field
  * returns a FacilityAgent record, which contains an integer `customID` field, with the value passed, if any
* New automated tests verify that a new method `getFacilityAgent` accepts a Facility ID and Agent Id and returns a `FacilityAgent` record, which contains an integer `customID` field
* New automated tests verify that a new method `setCustomId` 
  * accepts a Facility ID, Agent ID and `customId`.
  * calling `getFacilityAgent` returns a record with the ID passed to `setCustomId`
* A new DB migration script exists that adds DB table `FacilityAgent` with non-nullable foreign keys to `Facility` and `Agent`, and a nullable integer `customId` column.
#### Effort
Large

### Ticket 2: Update `getShiftsByFacility(facilityId)` to return custom Agent ID
#### Dependencies
* Ticket 1
#### Acceptance Criteria
* Add new automated tests to `getShiftsByFacility` to validate that a `customId` value passed to `setCustomId` is returned in each corresponding `Shift` record
* Add new automated tests to `getShiftsByFacility` to validate that for a `Facility`-`Agent` combination which hasn't had a `customId` set, `Shift` records contain a null value for `customId`
#### Implementation Details
* Ensure automated tests cover existing functionality of `getShiftsByFacility(facilityId)` 
#### Effort
Medium

### Ticket 3: Update `generateReport` to display custom Agent ID
#### Dependencies
* Ticket 1
#### Acceptance Criteria
* Add new automated tests to `generateReport` to validate that `customIds` passed in `Shift` records are displayed in PDF
* Add new automated tests to `generateReport` to validate that `Shift` records with a null `customId` display "n/a"
#### Implementation Details
* Ensure automated tests cover existing functionality of `generateReport(shiftIds)`
#### Effort
Medium

### Ticket 4: Extend UI (needs UX details)
#### Dependencies
* Ticket 1
* Ticket 2
* Ticket 3
#### Acceptance Criteria
* User can set Custom ID for a combination of Facility and Agent
* User can display Custom ID for a combination of Facility and Agent
* Custom ID is displayed for each Shift`in the PDF
* If a Custom ID has not been set for a combination of Facility and Agent, the Shifts display "n/a" for Custom ID
