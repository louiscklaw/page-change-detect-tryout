#!/usr/bin/env python3

import sys
import os, re, subprocess
import slack
import chalk

from fabric.api import local, shell_env, lcd, run, settings

def get_branch_name(branch_in):
  temp = branch_in.split('/')
  if len(temp) > 1:
    return '/'.join(temp[1:])
  else:
    return branch_in

def create_temp_dir():
  TEMP_DIR = local('mktemp -d', capture=True)
  print(f'create temp directory: {TEMP_DIR}')
  return TEMP_DIR


def merge_to_feature_branch(test_branch_name, feature_branch_name, cwd):
  create_branch_if_not_exist(feature_branch_name, cwd)

  # TODO:
  # checkout_branch(feature_branch_name, cwd)

  # currently in feature branch
  run_command('git merge --ff-only "{}"'.format(test_branch_name), cwd, ignore_error=False)

def merge_to_pre_merge_branch(fix_branch_name, pre_merge_branch_name, cwd):
  create_branch_if_not_exist(pre_merge_branch_name, cwd)
  # currently in feature branch

  run_command('git merge --ff-only "{}"'.format(fix_branch_name), cwd)

def merge_to_develop_branch(branch_to_merge, cwd):
  checkout_branch('develop', cwd)
  run_command('git merge --ff-only "{}"'.format(branch_to_merge), cwd)


def merge_to_pre_merge_master_branch(branch_to_merge, cwd):
  # create_branch_if_not_exist('pre-merge-master', cwd)
  # push_commit(PUSH_URI, 'pre-merge-master', cwd)

  # run_command("git push", cwd)
  # run_command('git merge --ff-only "{}"'.format(branch_to_merge), cwd)

  # working code
  # run_command("git checkout master", cwd)
  # run_command('git checkout -b pre-merge-master', cwd)
  # run_command('git merge -m"pre-merge-master from develop and use theirs for test," origin/develop',cwd)
  # run_command('git branch', cwd)
  # run_command('git status',cwd)
  # run_command('git push -f --set-upstream origin pre-merge-master',cwd)

  print('into merge_to_pre_merge_master_branch')
  create_branch_if_not_exist('pre-merge-master', cwd)
  run_command('git merge -m"pre-merge-master from develop and use theirs for test," origin/develop',cwd)

def merge_to_master_branch(branch_to_merge, cwd):
  checkout_branch('master', cwd)
  run_command('git merge --ff-only "{}"'.format(branch_to_merge), cwd)


OS_CWD=os.getcwd()

CONST_BRANCH_UNKNOWN = -1
CONST_BRANCH_FIX = 0
CONST_BRANCH_FEATURE = 1
CONST_BRANCH_TEST = 2
CONST_BRANCH_PRE_MERGE = 3
CONST_BRANCH_DEVELOP = 4
CONST_BRANCH_PRE_MERGE_MASTER = 5
CONST_BRANCH_DEPENDABOT = 6

DRY_RUN=False

merge_direction = {
  '^dependabot/(.+?)$': 'feature',
  '^test/(.+?)$': 'feature',
  '^feature/(.+?)$' : 'develop',
  '^fix/(.+?)$' : 'pre-merge',
  '^pre-merge/(.+?)$' : 'develop',
  # 'develop': 'master'
}

ERR_DRY_RUN_EXPLAIN='DRY RUN ACCEPTED'

GIT_ERR_128_EXPLAIN="error found during creating new branch, check if token is possible to create branch in repo (private repo ?)"

GIT_ERR_CANNOT_CHECKOUT_BRANCH_EXPLAIN="error during checkout branch '{}', is the branch exist ?"
