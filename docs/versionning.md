# 🏷️ Versionning

## Gitignore
The gitignore file allows to disable the versioning of some files.

Modern IDEs and some sites like [Topal - gitignore.io](https://www.toptal.com/developers/gitignore/) allow to generate a .gitignore from a template.

## What is versioned?

Binaries and build output/garbage **SHOULD NOT** be versioned.

Credentials and secrets **MUST NOT** be versionned.

User settings **SHOULD NOT** be versioned.

Developers and reviewers **MUST** ensure the conformity of the `.gitignore` file as they develop.

# Commits message structure

The idea is to use a naming convention for commits in order to give the same semantics to commits.

It comes from the following work: 

[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

TL;DR:

```text
<type>(optional scope): #<jira-project>-<jira-ticket-number> <description>

[optional body]

[optional footer(s)]
```

Type can be:
- **fix**: for a correction
- **feat**: for a new functionality
- **docs**: for an update of the documentation
- **style**: for a style update (branding, font, ...)
- **ci**: continuous integration modification
- **test**: test modification
- **perf**: performance improvement
- **refactor**: for technical (non-functionnal) change
- **chore**: for maintenance or configuration changes

The scope corresponds to the project you are working on (the functionality(es) affected by the change)

> The scopes are not fixed, be inventive, the idea is to quickly communicate to others the areas affected by a commit.

> Jira ticket number is mandatory on `main` branch (include it with merge / squash commit).

Examples:

````text
feat!: #EE-123 send an email to the user for account confirmation
````

````text
fix(calendar): #EE-456 user can filter events
````

````text
hotfix(login): #EE-789 user mail is now validated to prevent storing incorrect mail
````

Full specification: https://www.conventionalcommits.org/en/v1.0.0/

If the specification is correctly followed, it allows to generate CHANGELOG files using this [kind of tools](https://github.com/googleapis/release-please)

Also, it is possible to automatically generate the software version number using [SemVer](https://semver.org/lang/fr/).

In this case the commits on `main` **MUST** follow this standard.

Commits from other branches **SHOULD** follow this standard if the branches are squashed when merging.

# 🪴 Workflow (big project)

Used on projects: 
- [event-ease-web-app/event-ease-backend](https://github.com/Event-Ease-Web-App/event-ease)

## Branches
- `main` **MUST** contain stable code (tested and validated) in order to be able to rollback to any commit without the fear of being unstable.
  - `hot-fix/*` **MUST** be created by each developer working on urgent fix for production.
- `dev` **MUST** contain in development code.
  - `fix/*` **MUST** be created by each developer when working on a fix for the current sprint (not urgent for production).
  - `feat/*` **MUST** be created by each developer who is working on the current sprint. `dev` is then used to synchronize the development once the reviews and unit tests are validated.

## Pull request

### `fix/*` or `feat/*` to `dev`:

- All unit and integration tests **MUST** be valid. (pipeline **SHOULD** be triggered to ensure this)
- At least one another developer **MUST** give his approval following a code review.
    - All exchanges around the code must take the form of comments on Github in order to:
        - Allow Asynchronous exchanges between developers
        - Keep a history of decisions made
- The `dev/*` branch **MUST** be up to date with `dev` and any conflicts **MUST** be solved.

👇👇👇
> ⚠ Prefer a rebase to synchronize your branch with `dev` before merging (unless other developers are working with you on the branch).
>
> As GitHub does not offer fast-forward merge, use the `Squash commit` option when merging your branch to dev to encourage a linear history.

### `dev` to `master`:
- All functional tests **MUST** be valid.

👇👇👇
> ⚠ Do a merge to synchronize `dev` with `master` before merging.
> 
> Use `Merge commit` when merging `dev` to `master` to track PR validation on `master`.