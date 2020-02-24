# git提交规范

在前端工程化中，git提交一直是一个问题，如何保证提交的规范化？社区提供了这么一套规范：

* commitizen：是一个撰写合格 Commit message 的工具。

* validate-commit-msg：是对我们的git提交进行校验合法性的。

* ghooks：是在git提交的时候，提供了相应的钩子函数。

* changelog：根据合法的git提交日志，生成CHANGELOG.md文件。

### 什么是合法的git提交规范？

Commit message 的格式：Commit message 都包括三个部分：Header，Body 和 Footer。

```text
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
其中，Header 是必需的，Body 和 Footer 可以省略。

不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

**Header**

Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

type用于说明 commit 的类别，只允许使用下面7个标识。

* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

subject是 commit 目的的简短描述，不超过50个字符。

**Body**

Body 部分是对本次 commit 的详细描述，可以分成多行。

**Footer**

Footer 部分只用于两种情况。

1、不兼容变动

2、关闭 Issue

### commitizen

为了撰写合格的commit，使用commitizen。先进行全局安装。

```text
npm install -g commitizen
```

第二步执行下面命令，使其支持 Angular 的 Commit message 格式。
```text
commitizen init cz-conventional-changelog --save --save-exact
```
以后，凡是用到git commit命令，一律改为使用git cz。这时，就会出现选项，用来生成符合格式的 Commit message。

### validate-commit-msg

这个时候，正常情况下，使用git cz，就会生成合法的git提交。但是可能有新人的情况下，不熟悉我们的项目规范，使用commit进行提交，那这个提交极有可能是不合法的。

为了保证我们的校验都是合法的commit message，可以使用 validate-commit-msg 这个包。

```text
npm install --save-dev validate-commit-msg
```

然后在package.json中加入以下配置。

```text
"config": {
    "ghooks": {
      "commit-msg": "validate-commit-msg"
    }
}
```
至于ghooks是什么，下面进行说明。

### ghooks

使用之前，必须安装 ghooks 包。

```
npm install ghooks --save-dev
```

可以在 package.json 中配置 ghooks，最常用的配置如下：

```text
{
  …
  "config": {
    "ghooks": {
      "pre-commit": "gulp lint",
      "commit-msg": "validate-commit-msg",
      "pre-push": "make test",
      "post-merge": "npm install",
      "post-rewrite": "npm install",
      …
    }
  }
  …
}
```

git hooks是一些自定义的脚本，用于控制git工作的流程，分为客户端钩子和服务端钩子。

客户端钩子包括：pre-commit、prepare-commit-msg、commit-msg、post-commit等，主要用于控制客户端git的提交工作流。

服务端钩子：pre-receive、post-receive、update，主要在服务端接收提交对象时、推送到服务器之前调用。



### changelog 提交日志自动生成

如何你的git提交都是规范的，就可以使用特殊的命令，直接生成一个changelog文件。

首先，下载对应的包。

```text
npm install -g conventional-changelog
npm install -g conventional-changelog-cli
```

接着，执行命令。

```text
conventional-changelog -p angular -i CHANGELOG.md -s -w
```

