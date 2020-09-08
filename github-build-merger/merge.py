#!/usr/bin/env python

# reference build https://travis-ci.org/louiscklaw/test_git_repo/builds/625335510
# https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables

import sys
import os, re, subprocess
import slack
import chalk

from fabric.api import local, shell_env, lcd, run, settings

from MyException import *
from common import *
from env_config import *


def create_new_branch(branch_name, cwd):
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('checkout new branch: {}'.format(branch_name))
    run_command('git checkout -b {}'.format(branch_name), cwd)

def checkout_branch(branch_name, cwd):
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('checkout branch: {}'.format(branch_name))
    run_command('git checkout {}'.format(branch_name), cwd)

def create_branch_if_not_exist(branch_name, cwd):
  'checkout branch if exist, create and checkout if not exist'
  if check_branch_exist(branch_name, cwd):
    checkout_branch(branch_name, cwd)
  else:
    create_new_branch(branch_name, cwd)

def create_branch_if_not_exist_remote(branch_name, cwd):
  'checkout branch if exist, create and checkout if not exist'
  if check_branch_exist(branch_name, cwd) or check_remote_branch_exist(branch_name, cwd):
    checkout_branch(branch_name, cwd)
  else:
    create_new_branch(branch_name, cwd)

def check_branch_exist(branch_name, cwd):
  print_message('check branch exist, {}'.format(branch_name))
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('check branch exist: {}'.format(branch_name))
    result = [temp.replace('* ','').strip() for temp in run_command('git branch', cwd).split('\n')]
    try:
      from pprint import pprint
      pprint(result)
      result.index(branch_name)
      print('branch found')
      return True
    except Exception as e:
      print('branch not found')
      print_message(result)
      return False
      pass

def check_remote_branch_exist(branch_name, cwd):
  print_message('check remote branch exist {}'.format(branch_name))
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('check remote branch exist: {}'.format(branch_name))
    result = [temp.replace('* ','').strip() for temp in run_command('git branch -a', cwd).split('\n')]
    try:
      from pprint import pprint
      pprint(result)
      result.index('remotes/origin/'+branch_name)
      print('branch found')
      return True
    except Exception as e:
      print('branch not found')
      print_message(result)
      return False
      pass

def categorize_branch(branch_to_test):

  if branch_to_test[0:4] == 'fix/':
    return CONST_BRANCH_FIX
  elif branch_to_test == 'develop':
    return CONST_BRANCH_DEVELOP
  elif branch_to_test == 'pre-merge-master':
    return CONST_BRANCH_PRE_MERGE_MASTER
  elif branch_to_test[0:8] == 'feature/':
    return CONST_BRANCH_FEATURE
  elif branch_to_test[0:5] == 'test/':
    return CONST_BRANCH_TEST
  elif branch_to_test[0:10] == 'pre-merge/':
    return CONST_BRANCH_PRE_MERGE
  elif branch_to_test[0:11] == 'dependabot/':
    return CONST_BRANCH_DEPENDABOT
  else:
    return CONST_BRANCH_UNKNOWN

def process_test_branch(PUSH_URI, test_branch_name, cwd, no_push_uri = False):
  branch_name = get_branch_name(test_branch_name)
  feature_branch_name = 'feature/'+branch_name

  # CAUTION: using cwd inside run_command

  with settings(warn_only=True):
    run_result = run_command('git clone  -b {} {} .'.format(test_branch_name, PUSH_URI), cwd)


    if (run_result.failed == ERR_DRY_RUN_EXPLAIN):
      print(chalk.yellow(ERR_DRY_RUN_EXPLAIN))

    elif run_result.failed:
      print(chalk.red(GIT_ERR_128_EXPLAIN))
      raise GIT_ERR_128_EXPLAIN
    else:
      pass

  merge_to_feature_branch(test_branch_name, feature_branch_name, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, feature_branch_name, cwd)

def process_feature_branch(PUSH_URI, feature_branch_in, cwd, no_push_uri = False):


  branch_name = get_branch_name(feature_branch_in)
  pre_merge_branch = 'pre-merge/'+branch_name

  # CAUTION: using cwd inside run_command
  run_command('git clone  -b {} {} .'.format(feature_branch_in, PUSH_URI), cwd)

  merge_to_pre_merge_branch(feature_branch_in, pre_merge_branch, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    # IDEA: trigger when push to github fail
    push_commit(PUSH_URI, pre_merge_branch, cwd, False)

def process_fix_branch(PUSH_URI, fix_branch_in, cwd, no_push_uri = False):
  branch_name = get_branch_name(fix_branch_in)
  pre_merge_branch = 'pre-merge/'+branch_name

  # CAUTION: using cwd inside run_command
  run_command('git clone  -b {} {} .'.format(fix_branch_in, PUSH_URI), cwd)

  merge_to_pre_merge_branch(fix_branch_in, pre_merge_branch, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, pre_merge_branch, cwd)


def process_pre_merge_branch(PUSH_URI, pre_merge_branch_in, cwd, no_push_uri = False):
  branch_name = get_branch_name(pre_merge_branch_in)
  run_command('git clone  -b {} {} .'.format(pre_merge_branch_in, PUSH_URI), cwd)
  merge_to_develop_branch(pre_merge_branch_in, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, 'develop', cwd)


def process_develop_branch(PUSH_URI, pre_merge_branch_in, cwd, no_push_uri = False):
  'checkout master branch, create pre-merge-master'
  'on pre-merge-master branch, merge develop and re-test'

  run_command('git clone {} .'.format(PUSH_URI), cwd)
  merge_to_pre_merge_master_branch(pre_merge_branch_in, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    run_command('git push -f --set-upstream origin pre-merge-master',cwd)


def process_pre_merge_master_branch(PUSH_URI, pre_merge_branch_in, cwd, no_push_uri = False):
  'checkout pre-merge-master branch'
  'on master branch, merge pre-merge-master and re-test'

  run_command('git clone  -b {} {} .'.format(pre_merge_branch_in, PUSH_URI), cwd)
  merge_to_master_branch(pre_merge_branch_in, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, 'master', cwd)

def process_dependabot_PR(PUSH_URI, pr_branch, cwd, no_push_uri = False):
  print('hello process dependabot PR')
  '''
  Step 1: From your project repository, bring in the changes and test.

  git fetch origin
  git checkout -b "dependabot/npm_and_yarn/bulma-toast-tryout/lodash-4.17.19" "origin/dependabot/npm_and_yarn/bulma-toast-tryout/lodash-4.17.19"
  git merge "master"

  Step 2: Merge the changes and update on GitHub.

  git checkout "master"
  git merge --no-ff "dependabot/npm_and_yarn/bulma-toast-tryout/lodash-4.17.19"
  git push origin "master"
  '''

  test_pr_branch = 'test/'+pr_branch
  origin_pr_branch = 'origin/'+pr_branch

  print('PUSH_URI',PUSH_URI)
  print('pr_branch',pr_branch)
  print('test/pr_branch',test_pr_branch)
  print('origin/pr_branch', origin_pr_branch)
  print('cwd', cwd)


  print('Step 1: From your project repository, bring in the changes and test.')
  git_clone_source(PUSH_URI, cwd)
  # run_command('git fetch origin',cwd)
  # run_command('git checkout -b "{}" "{}"'.format(test_pr_branch, origin_pr_branch), cwd)

  # push_commit(PUSH_URI, test_pr_branch, cwd, False)

  # create_branch_if_not_exist_remote(test_pr_branch,cwd)
  checkout_branch('develop', cwd)
  run_command('git merge {}'.format(pr_branch))
  push_commit(PUSH_URI, 'develop', cwd, False)

  # print('Step 2: Merge the changes and update on GitHub.')
  # run_command('git checkout -b "test/dependabot/npm_and_yarn/bulma-toast-tryout/lodash-4.17.19"', cwd)
  # run_command('git merge --no-ff "dependabot/npm_and_yarn/bulma-toast-tryout/lodash-4.17.19"', cwd)
  # git push origin "master"

def check_branch_exist(branch_name, cwd):
  print_message('check branch exist, {}'.format(branch_name))
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('check branch exist: {}'.format(branch_name))
    result = [temp.replace('* ','').strip() for temp in run_command('git branch', cwd).split('\n')]
    try:
      from pprint import pprint
      pprint(result)
      result.index(branch_name)
      print('branch found')
      return True
    except Exception as e:
      print('branch not found')
      print_message(result)
      return False
      pass

def print_message(msg_text):
  print(chalk.blue(msg_text))

def run_command(command_body, cwd=OS_CWD, ignore_error=True, except_in=MyException.command_error):
  if (DRY_RUN):
    return dummy_run_result()
  else:
    with settings(warn_only=True):
      command_to_run = 'cd {} && {}'.format(cwd, command_body)
      command_result = local(command_to_run, capture=True)
      print(command_result)

      if command_result.failed:
        if ignore_error:
          print(chalk.red('command: {}'.format(command_to_run)))
          print(chalk.red('error found during running command, ignore flag active'))
          print_message(command_result.stderr)
        else:
          print_error('run_command: error during running command "{}"'.format(command_to_run))

          print_error('run_command: error message')
          print_error(command_result.stderr)

          raise except_in

      return command_result

def helloworld():
  print('helloworld from merge.py')
  return 'helloworld test'

def main(PUSH_URI, TEMP_DIR):
  print('starting merger')
  print(f'triggering branch {TRIGGERING_BRANCH}')


  if categorize_branch(TRIGGERING_BRANCH) == CONST_BRANCH_TEST:
    # test branch will merge to feature branch
    print("this is test branch, will checkout to feature branch")
    process_test_branch(PUSH_URI, TRIGGERING_BRANCH, TEMP_DIR)

  else:
    print('no merge direction for this branch')


if __name__ == "__main__":
  TEMP_DIR = create_temp_dir()

  try:
    if ('-d' in sys.argv):
      print('dry run activated')
      DRY_RUN = True

    main(PUSH_URI, TEMP_DIR)

  except Exception as e:
    print('error found during merging repo')
    raise e
