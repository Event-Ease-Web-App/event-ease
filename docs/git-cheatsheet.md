# 🪅 Cheatsheet Git

## Basics

#### Commit changes

```shell
git add .
git add foo.bar
git commit -m "A great message"
```

#### Add all and commit

```shell
git commit -am "Great message that explain my commit"
```

#### Log previous commit

```shell
git log

# Better for human
git log --graph --color --oneline
```

#### See change of specific commit
```shell
git show <commit-hash>
```

#### Undo work

```shell
git checkout --

## Specific file

git checkout -- foo.bar 
```

#### Manage branch

```shell
# Create
git checkout -b cool-branch

# Change
git checkout master

# Back to previous
git checkout -

# You can checkout on remote (don't miss to fetch to be up to date)
git checkout remotes/origin/cool-branch

# List
git branch

# Push to remote
git push -u origin cool-branch 

# Sync with remote changes
git pull

# Force sync
git fetch --all 
git reset --hard origin/cool-branch

# Delete
git branch -D cool-branch # (not deleted on remote)
git branch -d cool-branch # (deleted on remote)

```

#### Create backup branch (in your local repository)
```shell
# Create backup from commit with ID 4c88422b
git branch my-branch-name-backup 4c88422b

# Create backup from two commits behind
git branch branch_name HEAD~2
```

## Stash

```shell
git stash       # save works
git stash apply # re-apply works

git stash push -m "my name"
git stash list
git stash apply stash@{n} # n is stash number
```

## Rebase / merge

Rebase your branch with new changes on master.

```shell
# (here we want to rebase our branch onto master)
# update the master branch with the remote server
git pull origin master

git rebase master

# You need to handle conflict
git add conflict_file.txt

git rebase --continue # or git rebase --abort

# Allow you to pick and drop commit (usefull when rebasing onto branch that has been rebased)
git rebase master --edit-todo

# rebase from last two commit (usefull when rebasing onto branch that has been rebased)  
git rebase --onto master --interactive HEAD~2

# you can also use a commit ID (don't miss the ^ to also include 4c88422b commit)
git rebase --onto master --interactive 4c88422b^
```

#### Force push rebased branch

```shell
# ! Only if no one else is working in the same branch (otherwise you have to warn the others first)

git push origin local-branch:distant-branch --force-with-lease
```

Merge your (rebased) branch on master.

```shell
git merge rebased-branch

git merge rebased-branch --squash # Squash all commit in a single merge commit 

```


## 🍒 Cherry pick

```shell
git cherry-pick 4c88422b

# Cherry-pick without commit (add commit changes to your current working tree)
git cherry-pick --no-commit 

```

### Single file from another branch

```shell
git checkout master -- foo.bar # Take foo.bar from master and put it current branch
```

### Show file content of another branch
git show branch:path/to/file/in/other/branch

## Revert commit
```shell
git revert commit_sha
```

### Undo a revert
With a revert commit :

```shell
git revert revert_commit_sha
```

If you haven't pushed it yet:

```shell
git reset --hard HEAD^

# If you want to stage all changes in the commit

git reset HEAD^
```

## Edit commit

### Edit commit message

```shell
git commit --amend
```

### Add missing file to a commit

```shell
git add missing_file.txt
git commit --amend
```

### Update (last) commit content

```shell
git reset --soft HEAD~1
git add missing_file.txt
git reset unwanted_file.txt
git commit -C ORIG_HEAD
```

## Fork

### Cherry-pick from fork
```shell
git remote add fork-name git@git.something.net/my-forked-project.git
# Now i can simply cherry-pick commit
git cherry-pick bd2dd9884f8f495a82f57afff6b768b5fb39b126 # commit hash exists only in the fork 
```

## Cleaning
```shell
# Remove useless stuff (branch, ...)
git gc

# Remove untracked
git clean -d -i
```

# Remove old/merged branches (locally) (using pwsh)
```powershell
git checkout master; git remote update origin --prune; git branch -vv | Select-String -Pattern ": gone]" | % { $_.toString().Trim().Split(" ")[0]} | % {git branch -d $_}
```