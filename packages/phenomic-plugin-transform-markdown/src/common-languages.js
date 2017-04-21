/* eslint-disable import/max-dependencies */

// https://github.com/isagalaev/highlight.js/tree/master/src/languages

// @todo more smart selection using an autoloading on demand
// and THAT TAKE ALIASES IN CONSIDERACTION

import css from "highlight.js/lib/languages/css.js"
import javascript from "highlight.js/lib/languages/javascript.js"
import xml from "highlight.js/lib/languages/xml.js"

export default {
  // @todo support aliases automatically!
  // we will have probably to reimplement remark-react-lowlight to support auto language loading
  css,
  javascript,
  js: javascript,
  html: xml,
}

// import oneC from "highlight.js/lib/languages/1c.js"
// import abnf from "highlight.js/lib/languages/abnf.js"
// import accesslog from "highlight.js/lib/languages/accesslog.js"
// import actionscript from "highlight.js/lib/languages/actionscript.js"
// import ada from "highlight.js/lib/languages/ada.js"
// import apache from "highlight.js/lib/languages/apache.js"
// import applescript from "highlight.js/lib/languages/applescript.js"
// import arduino from "highlight.js/lib/languages/arduino.js"
// import armasm from "highlight.js/lib/languages/armasm.js"
// import asciidoc from "highlight.js/lib/languages/asciidoc.js"
// import aspectj from "highlight.js/lib/languages/aspectj.js"
// import autohotkey from "highlight.js/lib/languages/autohotkey.js"
// import autoit from "highlight.js/lib/languages/autoit.js"
// import avrasm from "highlight.js/lib/languages/avrasm.js"
// import awk from "highlight.js/lib/languages/awk.js"
// import axapta from "highlight.js/lib/languages/axapta.js"
// import bash from "highlight.js/lib/languages/bash.js"
// import basic from "highlight.js/lib/languages/basic.js"
// import bnf from "highlight.js/lib/languages/bnf.js"
// import brainfuck from "highlight.js/lib/languages/brainfuck.js"
// import cal from "highlight.js/lib/languages/cal.js"
// import capnproto from "highlight.js/lib/languages/capnproto.js"
// import ceylon from "highlight.js/lib/languages/ceylon.js"
// import clean from "highlight.js/lib/languages/clean.js"
// import clojureRepl from "highlight.js/lib/languages/clojure-repl.js"
// import clojure from "highlight.js/lib/languages/clojure.js"
// import cmake from "highlight.js/lib/languages/cmake.js"
// import coffeescript from "highlight.js/lib/languages/coffeescript.js"
// import coq from "highlight.js/lib/languages/coq.js"
// import cos from "highlight.js/lib/languages/cos.js"
// import cpp from "highlight.js/lib/languages/cpp.js"
// import crmsh from "highlight.js/lib/languages/crmsh.js"
// import crystal from "highlight.js/lib/languages/crystal.js"
// import cs from "highlight.js/lib/languages/cs.js"
// import csp from "highlight.js/lib/languages/csp.js"
// import css from "highlight.js/lib/languages/css.js"
// import d from "highlight.js/lib/languages/d.js"
// import dart from "highlight.js/lib/languages/dart.js"
// import delphi from "highlight.js/lib/languages/delphi.js"
// import diff from "highlight.js/lib/languages/diff.js"
// import django from "highlight.js/lib/languages/django.js"
// import dns from "highlight.js/lib/languages/dns.js"
// import dockerfile from "highlight.js/lib/languages/dockerfile.js"
// import dos from "highlight.js/lib/languages/dos.js"
// import dsconfig from "highlight.js/lib/languages/dsconfig.js"
// import dts from "highlight.js/lib/languages/dts.js"
// import dust from "highlight.js/lib/languages/dust.js"
// import ebnf from "highlight.js/lib/languages/ebnf.js"
// import elixir from "highlight.js/lib/languages/elixir.js"
// import elm from "highlight.js/lib/languages/elm.js"
// import erb from "highlight.js/lib/languages/erb.js"
// import erlangRepl from "highlight.js/lib/languages/erlang-repl.js"
// import erlang from "highlight.js/lib/languages/erlang.js"
// import excel from "highlight.js/lib/languages/excel.js"
// import fix from "highlight.js/lib/languages/fix.js"
// import flix from "highlight.js/lib/languages/flix.js"
// import fortran from "highlight.js/lib/languages/fortran.js"
// import fsharp from "highlight.js/lib/languages/fsharp.js"
// import gams from "highlight.js/lib/languages/gams.js"
// import gauss from "highlight.js/lib/languages/gauss.js"
// import gcode from "highlight.js/lib/languages/gcode.js"
// import gherkin from "highlight.js/lib/languages/gherkin.js"
// import glsl from "highlight.js/lib/languages/glsl.js"
// import go from "highlight.js/lib/languages/go.js"
// import golo from "highlight.js/lib/languages/golo.js"
// import gradle from "highlight.js/lib/languages/gradle.js"
// import groovy from "highlight.js/lib/languages/groovy.js"
// import haml from "highlight.js/lib/languages/haml.js"
// import handlebars from "highlight.js/lib/languages/handlebars.js"
// import haskell from "highlight.js/lib/languages/haskell.js"
// import haxe from "highlight.js/lib/languages/haxe.js"
// import hsp from "highlight.js/lib/languages/hsp.js"
// import htmlbars from "highlight.js/lib/languages/htmlbars.js"
// import http from "highlight.js/lib/languages/http.js"
// import hy from "highlight.js/lib/languages/hy.js"
// import inform7 from "highlight.js/lib/languages/inform7.js"
// import ini from "highlight.js/lib/languages/ini.js"
// import irpf90 from "highlight.js/lib/languages/irpf90.js"
// import java from "highlight.js/lib/languages/java.js"
// import javascript from "highlight.js/lib/languages/javascript.js"
// import jbossCli from "highlight.js/lib/languages/jboss-cli.js"
// import json from "highlight.js/lib/languages/json.js"
// import julia from "highlight.js/lib/languages/julia.js"
// import kotlin from "highlight.js/lib/languages/kotlin.js"
// import lasso from "highlight.js/lib/languages/lasso.js"
// import ldif from "highlight.js/lib/languages/ldif.js"
// import leaf from "highlight.js/lib/languages/leaf.js"
// import less from "highlight.js/lib/languages/less.js"
// import lisp from "highlight.js/lib/languages/lisp.js"
// import livecodeserver from "highlight.js/lib/languages/livecodeserver.js"
// import livescript from "highlight.js/lib/languages/livescript.js"
// import llvm from "highlight.js/lib/languages/llvm.js"
// import lsl from "highlight.js/lib/languages/lsl.js"
// import lua from "highlight.js/lib/languages/lua.js"
// import makefile from "highlight.js/lib/languages/makefile.js"
// import markdown from "highlight.js/lib/languages/markdown.js"
// import mathematica from "highlight.js/lib/languages/mathematica.js"
// import matlab from "highlight.js/lib/languages/matlab.js"
// import maxima from "highlight.js/lib/languages/maxima.js"
// import mel from "highlight.js/lib/languages/mel.js"
// import mercury from "highlight.js/lib/languages/mercury.js"
// import mipsasm from "highlight.js/lib/languages/mipsasm.js"
// import mizar from "highlight.js/lib/languages/mizar.js"
// import mojolicious from "highlight.js/lib/languages/mojolicious.js"
// import monkey from "highlight.js/lib/languages/monkey.js"
// import moonscript from "highlight.js/lib/languages/moonscript.js"
// import n1ql from "highlight.js/lib/languages/n1ql.js"
// import nginx from "highlight.js/lib/languages/nginx.js"
// import nimrod from "highlight.js/lib/languages/nimrod.js"
// import nix from "highlight.js/lib/languages/nix.js"
// import nsis from "highlight.js/lib/languages/nsis.js"
// import objectivec from "highlight.js/lib/languages/objectivec.js"
// import ocaml from "highlight.js/lib/languages/ocaml.js"
// import openscad from "highlight.js/lib/languages/openscad.js"
// import oxygene from "highlight.js/lib/languages/oxygene.js"
// import parser3 from "highlight.js/lib/languages/parser3.js"
// import perl from "highlight.js/lib/languages/perl.js"
// import pf from "highlight.js/lib/languages/pf.js"
// import php from "highlight.js/lib/languages/php.js"
// import pony from "highlight.js/lib/languages/pony.js"
// import powershell from "highlight.js/lib/languages/powershell.js"
// import processing from "highlight.js/lib/languages/processing.js"
// import profile from "highlight.js/lib/languages/profile.js"
// import prolog from "highlight.js/lib/languages/prolog.js"
// import protobuf from "highlight.js/lib/languages/protobuf.js"
// import puppet from "highlight.js/lib/languages/puppet.js"
// import purebasic from "highlight.js/lib/languages/purebasic.js"
// import python from "highlight.js/lib/languages/python.js"
// import q from "highlight.js/lib/languages/q.js"
// import qml from "highlight.js/lib/languages/qml.js"
// import r from "highlight.js/lib/languages/r.js"
// import rib from "highlight.js/lib/languages/rib.js"
// import roboconf from "highlight.js/lib/languages/roboconf.js"
// import rsl from "highlight.js/lib/languages/rsl.js"
// import ruby from "highlight.js/lib/languages/ruby.js"
// import ruleslanguage from "highlight.js/lib/languages/ruleslanguage.js"
// import rust from "highlight.js/lib/languages/rust.js"
// import scala from "highlight.js/lib/languages/scala.js"
// import scheme from "highlight.js/lib/languages/scheme.js"
// import scilab from "highlight.js/lib/languages/scilab.js"
// import scss from "highlight.js/lib/languages/scss.js"
// import shell from "highlight.js/lib/languages/shell.js"
// import smali from "highlight.js/lib/languages/smali.js"
// import smalltalk from "highlight.js/lib/languages/smalltalk.js"
// import sml from "highlight.js/lib/languages/sml.js"
// import sqf from "highlight.js/lib/languages/sqf.js"
// import sql from "highlight.js/lib/languages/sql.js"
// import stan from "highlight.js/lib/languages/stan.js"
// import stata from "highlight.js/lib/languages/stata.js"
// import step21 from "highlight.js/lib/languages/step21.js"
// import stylus from "highlight.js/lib/languages/stylus.js"
// import subunit from "highlight.js/lib/languages/subunit.js"
// import swift from "highlight.js/lib/languages/swift.js"
// import taggerscript from "highlight.js/lib/languages/taggerscript.js"
// import tap from "highlight.js/lib/languages/tap.js"
// import tcl from "highlight.js/lib/languages/tcl.js"
// import tex from "highlight.js/lib/languages/tex.js"
// import thrift from "highlight.js/lib/languages/thrift.js"
// import tp from "highlight.js/lib/languages/tp.js"
// import twig from "highlight.js/lib/languages/twig.js"
// import typescript from "highlight.js/lib/languages/typescript.js"
// import vala from "highlight.js/lib/languages/vala.js"
// import vbnet from "highlight.js/lib/languages/vbnet.js"
// import vbscriptHtml from "highlight.js/lib/languages/vbscript-html.js"
// import vbscript from "highlight.js/lib/languages/vbscript.js"
// import verilog from "highlight.js/lib/languages/verilog.js"
// import vhdl from "highlight.js/lib/languages/vhdl.js"
// import vim from "highlight.js/lib/languages/vim.js"
// import x86asm from "highlight.js/lib/languages/x86asm.js"
// import xl from "highlight.js/lib/languages/xl.js"
// import xml from "highlight.js/lib/languages/xml.js"
// import xquery from "highlight.js/lib/languages/xquery.js"
// import yaml from "highlight.js/lib/languages/yaml.js"
// import zephir from "highlight.js/lib/languages/zephir.js"

// export default {
// "1c": oneC,
// abnf,
// accesslog,
// actionscript,
// ada,
// apache,
// applescript,
// arduino,
// armasm,
// asciidoc,
// aspectj,
// autohotkey,
// autoit,
// avrasm,
// awk,
// axapta,
// bash,
// basic,
// bnf,
// brainfuck,
// cal,
// capnproto,
// ceylon,
// clean,
// clojureRepl,
// clojure,
// cmake,
// coffeescript,
// coq,
// cos,
// cpp,
// crmsh,
// crystal,
// cs,
// csp,
// css,
// d,
// dart,
// delphi,
// diff,
// django,
// dns,
// dockerfile,
// dos,
// dsconfig,
// dts,
// dust,
// ebnf,
// elixir,
// elm,
// erb,
// erlangRepl,
// erlang,
// excel,
// fix,
// flix,
// fortran,
// fsharp,
// gams,
// gauss,
// gcode,
// gherkin,
// glsl,
// go,
// golo,
// gradle,
// groovy,
// haml,
// handlebars,
// haskell,
// haxe,
// hsp,
// htmlbars,
// http,
// hy,
// inform7,
// ini,
// irpf90,
// java,
// javascript,
// jbossCli,
// json,
// julia,
// kotlin,
// lasso,
// ldif,
// leaf,
// less,
// lisp,
// livecodeserver,
// livescript,
// llvm,
// lsl,
// lua,
// makefile,
// markdown,
// mathematica,
// matlab,
// maxima,
// mel,
// mercury,
// mipsasm,
// mizar,
// mojolicious,
// monkey,
// moonscript,
// n1ql,
// nginx,
// nimrod,
// nix,
// nsis,
// objectivec,
// ocaml,
// openscad,
// oxygene,
// parser3,
// perl,
// pf,
// php,
// pony,
// powershell,
// processing,
// profile,
// prolog,
// protobuf,
// puppet,
// purebasic,
// python,
// q,
// qml,
// r,
// rib,
// roboconf,
// rsl,
// ruby,
// ruleslanguage,
// rust,
// scala,
// scheme,
// scilab,
// scss,
// shell,
// smali,
// smalltalk,
// sml,
// sqf,
// sql,
// stan,
// stata,
// step21,
// stylus,
// subunit,
// swift,
// taggerscript,
// tap,
// tcl,
// tex,
// thrift,
// tp,
// twig,
// typescript,
// vala,
// vbnet,
// vbscriptHtml,
// vbscript,
// verilog,
// vhdl,
// vim,
// x86asm,
// xl,
// xml,
// xquery,
// yaml,
// zephir,
// }
