import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import MainActivityStyles from './MainActivityStyles';
import Row from '../../components/Row';
//#c264ffone all 24/03/2023 = in(19:58) local history(in vs code Timeline)....... CHANGED BUILT-IN EVAL METHOD TO OWN EVALUATION METHOD
import ButtonCalc from '../../components/ButtonCalc';
const MainActivity = () => {
  let sumOperator;
  let minusOperator;
  let multiplyOperator;
  let divideOperator;
  let exponent10Operator;
  let exponentOperator;
  let rootOperator;
  let root3Operator;
  let sinOperator;
  let cosOperator;
  let tanOperator;
  let factOperator;
  let logOperator;
  let lnOperator;
  let sinInverseOperator;
  let cosInverseOperator;
  let tanInverseOperator;
  const [mainText, setmainText] = useState('');
  const [result, setResult] = useState('');

  const [mainTextIn, setmainTextIn] = useState('');
  const [calculated, showResult] = useState(false);

  function evaluate(string) {
    if (string.indexOf('(') !== -1) {
      let no_of_instances_brac_open = occurencesIndexes(string, '(');
      let no_of_instances_brac_close = occurencesIndexes(string, ')');

      if (
        no_of_instances_brac_open.length !== no_of_instances_brac_close.length
      ) {
        throw 'BRACKET_FORMAT_ERROR';
      } else {
        for (let i = 0; i < no_of_instances_brac_open.length; i++) {
          let lastOpenBracIndex =
            no_of_instances_brac_open[no_of_instances_brac_open.length - 1];
          let firstCloseBracIndex = no_of_instances_brac_close[0];

          let subString = string.substring(
            lastOpenBracIndex + 1,
            firstCloseBracIndex,
          );
          evaluateSimple(string);
        }
      }
    } else {
      evaluateSimple(string);
    }
  }
  function evaluateSimple(string) {
    const plusMinusRegex = /\+-/g;
    const minusMinusRegex = /\--/g;
    const minusPlusRegex = /\-+/g;
    const plusPlusRegex = /\++/g;

    string = string
      .replace(plusMinusRegex, '-')
      .replace(minusMinusRegex, '+')
      .replace(minusPlusRegex, '-')
      .replace(plusPlusRegex, '+');

    sumOperator = occurencesIndexes(string, '+', false);
    minusOperator = occurencesIndexes(string, '-', false);
    multiplyOperator = occurencesIndexes(string, '*', false);
    divideOperator = occurencesIndexes(string, '/', false);
    exponent10Operator = occurencesIndexes(string, 'E', false);
    exponentOperator = occurencesIndexes(string, '^', false);
    rootOperator = occurencesIndexes(string, '√', false);
    root3Operator = occurencesIndexes(string, '∛', false);
    sinOperator = occurencesIndexes(string, 'sin(', true);
    cosOperator = occurencesIndexes(string, 'cos(', true);
    tanOperator = occurencesIndexes(string, 'tan(', true);
    factOperator = occurencesIndexes(string, '!', false);
    logOperator = occurencesIndexes(string, 'log(', true);
    lnOperator = occurencesIndexes(string, 'ln(', true);
    sinInverseOperator = occurencesIndexes(string, 'sin^-1(', true);
    cosInverseOperator = occurencesIndexes(string, 'cos^-1(', true);
    tanInverseOperator = occurencesIndexes(string, 'tan^-1(', true);

    let divideRegex = /(\-)?\d+(\d*\.?\d+)?\/\d+(\d*\.?\d+)?/g;
    let minusRegex = /(\-)?\d+(\d*\.?\d+)?\-\d+(\d*\.?\d+)?/g;
    let multiplyRegex = /(\-)?\d+(\d*\.?\d+)?\*\d+(\d*\.?\d+)?/g;
    let plusRegex = /(\-)?\d+(\d*\.?\d+)?\+\d+(\d*\.?\d+)?/g;
    let exponentRegex = /\d+(\d*\.?\d+)?\^\d+(\d*\.?\d+)?/g;
    let exponent10Regex = /E\d+(\d*\.?\d+)?/g;
    let factRegex = /\d+(.\d)?\!/g;
    let sinRegex = /sin\((\-)?\d+(\d*\.?\d+)?\)/g;
    let sinRegexWithoutOperator = /sin(\-)?\d+(\d*\.?\d+)?/g;
    let cosRegex = /cos\((\-)?\d+(\d*\.?\d+)?\)/g;
    let cosRegexWithoutOperator = /cos(\-)?\d+(\d*\.?\d+)?/g;
    let tanRegex = /tan\((\-)?\d+(\d*\.?\d+)?\)/g;
    let tanRegexWithoutOperator = /tan(\-)?\d+(\d*\.?\d+)?/g;
    let logRegex = /log\((\-)?\d+(\d*\.?\d+)?\)/g;
    let logRegexWithoutOperator = /log(\-)?\d+(\d*\.?\d+)?/g;
    let lnRegex = /ln\((\-)?\d+(\d*\.?\d+)?\)/g;
    let lnRegexWithoutOperator = /ln(\-)?\d+(\d*\.?\d+)?/g;
    let rootRegex = /√\d+(\.\d+)?/g;
    //let rootRegexWithoutOperator = /ln(\-)?\d+(\d*\.?\d+)?/g;
    let root3Regex = /∛\d+(\.\d+)?/g;
    // let root3RegexWithoutOperator = /ln(\-)?\d+(\d*\.?\d+)?/g;
    let sinInverseRegex = /sin\^-1\((\-)?\d+(\d*\.?\d+)?\)/g;
    let cosInverseRegex = /cos\^-1\((\-)?\d+(\d*\.?\d+)?\)/g;
    let tanInverseRegex = /tan\^-1\((\-)?\d+(\d*\.?\d+)?\)/g;

    if (exponent10Operator.length !== 0) {
      let E = string.match(exponent10Regex);

      if (E.length !== 0) {
        for (let z = 0; z < E.length; z++) {
          let i = 1;
          let item = E[z];
          if (item.indexOf('-') === -1) {
            let times = item.replace('E', '');
            let s = '1';
            while (i <= times) {
              s = s + '0';
              i++;
            }

            string = string.replace(E[z], s);
          } else {
            let times = item.replace('E-', '');
            let s = '1';
            while (i <= times) {
              s = s + '0';
              i++;
            }

            let result = 1 / s;
            string = string.replace(E[z], result);
          }
        }
      }
    }
    if (exponentOperator.length !== 0) {
      let F = string.match(exponentRegex);

      if (F.length !== 0) {
        for (let z = 0; z < F.length; z++) {
          let item = F[z];

          let replaced = item.replace('^', '**');
          // eslint-disable-next-line no-eval
          let result = eval(replaced);

          string = string.replace(F[z], result);
        }
      }
    }
    try {
      if (factOperator.length !== 0) {
        let F = string.match(factRegex);

        if (F.length !== 0) {
          for (let z = 0; z < F.length; z++) {
            let item = F[z];
            let value = item.replace('!', '');
            let result = factorial(value);
            string = string.replace(F[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }

    try {
      if (sinOperator.length !== 0) {
        let G = string.match(sinRegex);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('sin(', '').replace(')', '');
            let result = Math.sin(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }

    try {
      if (sinInverseOperator.length !== 0) {
        console.log('enteredSinInv');
        let G = string.match(sinInverseRegex);

        if (G.length !== 0) {
          console.log('enteredSinInv-found');
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('sin^-1(', '').replace(')', '');
            let result = Math.asin(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }

    try {
      if (tanOperator.length !== 0) {
        let G = string.match(tanRegex);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('tan(', '').replace(')', '');
            let result = Math.tan(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    // try {
    //   if (tanInverseOperator.length !== 0) {
    //     let G = string.match(tanInverseRegex);
    //
    //     if (G.length !== 0) {
    //       for (let z = 0; z < G.length; z++) {
    //         let item = G[z];
    //         let value = item.replace('tan^-1(', '').replace(')', '');
    //         let result = Math.atan(value);
    //         string = string.replace(G[z], result);
    //       }
    //     }
    //   }
    // } catch (e) {
    //   console.warn(e);
    // }

    try {
      if (cosOperator.length !== 0) {
        let G = string.match(cosRegex);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('cos(', '').replace(')', '');
            let result = Math.cos(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    // try {
    //   if (cosInverseOperator.length !== 0) {
    //     let G = string.match(cosInverseRegex);
    //
    //     if (G.length !== 0) {
    //       for (let z = 0; z < G.length; z++) {
    //         let item = G[z];
    //         let value = item.replace('cos^-1(', '').replace(')', '');
    //         let result = Math.acos(value);
    //         string = string.replace(G[z], result);
    //       }
    //     }
    //   }
    // } catch (e) {
    //   console.warn(e);
    // }
    try {
      if (logOperator.length !== 0) {
        let G = string.match(logRegex);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('log(', '').replace(')', '');
            let result = Math.log10(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (lnOperator.length !== 0) {
        let G = string.match(lnRegex);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('ln(', '').replace(')', '');
            let result = Math.log(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (rootOperator.length !== 0) {
        let G = string.match(rootRegex);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('√', '');
            let result = Math.sqrt(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (root3Operator.length !== 0) {
        let G = string.match(root3Regex);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('∛', '');
            let result = Math.cbrt(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    if (divideOperator.length !== 0) {
      let divisionParts = string.match(divideRegex);

      if (divisionParts !== null) {
        for (let i = 0; i < divisionParts.length; i++) {
          let beforeString = divisionParts[i].substring(
            0,
            divisionParts[i].indexOf('/'),
          );
          let afterString = divisionParts[i].substring(
            divisionParts[i].indexOf('/') + 1,
            divisionParts[i].length,
          );

          let x = parseFloat(beforeString);
          let y = parseFloat(afterString);
          let result = x / y;

          string = string.replace(
            '(' + beforeString + '/' + afterString + ')',
            result.toString(),
          );

          string = string.replace(
            beforeString + '/' + afterString,
            result.toString(),
          );

          string = string
            .replace(plusMinusRegex, '-')
            .replace(minusMinusRegex, '+');
        }
      }
    }

    if (multiplyOperator.length !== 0) {
      let multiplyParts = string.match(multiplyRegex);

      if (multiplyParts != null) {
        for (let i = 0; i < multiplyParts.length; i++) {
          let beforeString = multiplyParts[i].substring(
            0,
            multiplyParts[i].indexOf('*'),
          );
          let afterString = multiplyParts[i].substring(
            multiplyParts[i].indexOf('*') + 1,
            multiplyParts[i].length,
          );

          let x = parseFloat(beforeString);
          let y = parseFloat(afterString);
          let result = x * y;

          string = string.replace(
            '(' + beforeString + '*' + afterString + ')',
            result.toString(),
          );
          string = string.replace(
            beforeString + '*' + afterString,
            result.toString(),
          );

          string = string
            .replace(plusMinusRegex, '-')
            .replace(minusMinusRegex, '+');
        }
      }
    }
    if (sumOperator.length !== 0) {
      let sumParts = string.match(plusRegex);

      if (sumParts !== null) {
        for (let i = 0; i < sumParts.length; i++) {
          let beforeString = sumParts[i].substring(
            0,
            sumParts[i].lastIndexOf('+'),
          );

          let afterString = sumParts[i].substring(
            sumParts[i].lastIndexOf('+') + 1,
            sumParts[i].length,
          );

          let x = parseFloat(beforeString);
          let y = parseFloat(afterString);
          let result = x + y;
          string = string.replace(
            '(' + beforeString + '+' + afterString + ')',
            result.toString(),
          );
          string = string.replace(
            beforeString + '+' + afterString,
            result.toString(),
          );

          string = string
            .replace(plusMinusRegex, '-')
            .replace(minusMinusRegex, '+');
        }
        evaluate(string);
      }
    }

    if (minusOperator.length !== 0) {
      let minusParts = string.match(minusRegex);

      if (minusParts != null) {
        for (let i = 0; i < minusParts.length; i++) {
          let beforeString = minusParts[i].substring(
            0,
            minusParts[i].lastIndexOf('-'),
          );

          let afterString = minusParts[i].substring(
            minusParts[i].lastIndexOf('-') + 1,
            minusParts[i].length,
          );

          let x = parseFloat(beforeString);
          let y = parseFloat(afterString);
          let result = x - y;
          string = string.replace(
            '(' + beforeString + '-' + afterString + ')',
            result.toString(),
          );

          string = string.replace(
            beforeString + '-' + afterString,
            result.toString(),
          );

          string = string
            .replace(plusMinusRegex, '-')
            .replace(minusMinusRegex, '+');
        }
        evaluate(string);
      }
    }
    try {
      if (factOperator.length !== 0) {
        let F = string.match(factRegex);

        if (F.length !== 0) {
          for (let z = 0; z < F.length; z++) {
            let item = F[z];
            let value = item.replace('!', '');
            let result = factorial(value);
            string = string.replace(F[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (sinOperator.length !== 0) {
        let G = string.match(sinRegexWithoutOperator);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('sin', '');
            let result = Math.sin(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (cosOperator.length !== 0) {
        let G = string.match(cosRegexWithoutOperator);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('cos', '');
            let result = Math.cos(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (tanOperator.length !== 0) {
        let G = string.match(tanRegexWithoutOperator);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('tan', '');
            let result = Math.tan(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (logOperator.length !== 0) {
        let G = string.match(logRegexWithoutOperator);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];
            let value = item.replace('log', '');
            let result = Math.log10(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }
    try {
      if (lnOperator.length !== 0) {
        let G = string.match(lnRegexWithoutOperator);

        if (G.length !== 0) {
          for (let z = 0; z < G.length; z++) {
            let item = G[z];

            let value = item.replace('ln', '');
            let result = Math.log(value);
            string = string.replace(G[z], result);
          }
        }
      }
    } catch (e) {
      console.warn(e);
    }

    setResult(string);
    showResult(true);
  }
  function clearAll() {
    setmainText('');
    setmainTextIn('');
    showResult(false);
    setResult('');
    sumOperator = [];
    minusOperator = [];
    multiplyOperator = [];
    divideOperator = [];
    exponent10Operator = [];
    exponentOperator = [];
    rootOperator = [];
    sinOperator = [];
    cosOperator = [];
    tanOperator = [];
    factOperator = [];
  }

  function equals() {
    try {
      let finalText = mainTextIn.replace(/\s/, '');
      let fText;
      fText = finalText;

      if (finalText.startsWith('*')) {
        fText = fText.substring(1, finalText.length);
      }
      if (finalText.indexOf('%') !== -1) {
        let index = finalText.lastIndexOf('%');
        if (
          finalText.charAt(index + 1) === '+' ||
          finalText.charAt(index + 1) === '-' ||
          finalText.charAt(index + 1) === '/'
        ) {
          fText = fText.replace('%', '/100');
        } else {
          fText = fText.replace('%', '/100*');
        }
      }
      if (
        fText.endsWith('*') ||
        fText.endsWith('/') ||
        fText.endsWith('-') ||
        fText.endsWith('+')
      ) {
        fText = fText.substring(0, fText.length - 1);
      }
      if (
        mainText.endsWith('x') ||
        mainText.endsWith('÷') ||
        mainText.endsWith('-') ||
        mainText.endsWith('+')
      ) {
        setmainText(mainText.substring(0, mainText.length - 1));
      }

      try {
        evaluate(fText);
      } catch (error) {
        setmainTextIn(error);
        showResult(true);
      }
    } catch (e) {
      showResult(true);
      setmainTextIn('UNKNOWN ERROR');
    }
  }

  function press(element) {
    switch (element) {
      case 'AC':
        clearAll();
        break;
      case '0':
        setmainText(mainText + '0');
        setmainTextIn(mainTextIn + '0');
        break;
      case '1':
        setmainText(mainText + '1');
        setmainTextIn(mainTextIn + '1');

        break;

      case '2':
        setmainText(mainText + '2');
        setmainTextIn(mainTextIn + '2');

        break;

      case '3':
        setmainText(mainText + '3');
        setmainTextIn(mainTextIn + '3');

        break;

      case '4':
        setmainText(mainText + '4');
        setmainTextIn(mainTextIn + '4');

        break;

      case '5':
        setmainText(mainText + '5');
        setmainTextIn(mainTextIn + '5');

        break;

      case '6':
        setmainText(mainText + '6');
        setmainTextIn(mainTextIn + '6');

        break;
      case '7':
        setmainText(mainText + '7');
        setmainTextIn(mainTextIn + '7');

        break;

      case '8':
        setmainText(mainText + '8');
        setmainTextIn(mainTextIn + '8');

        break;
      case '9':
        setmainText(mainText + '9');
        setmainTextIn(mainTextIn + '9');

        break;
      case '+':
        setmainText(mainText + '+');
        setmainTextIn(mainTextIn + '+');

        break;
      case '-':
        setmainText(mainText + '-');
        setmainTextIn(mainTextIn + '-');

        break;
      case 'x':
        setmainText(mainText + 'x');
        setmainTextIn(mainTextIn + '*');

        break;
      case '÷':
        setmainText(mainText + '÷');
        setmainTextIn(mainTextIn + '/');

        break;
      case '=':
        equals();

        break;
      case '(':
        setmainText(mainText + '(');
        setmainTextIn(mainTextIn + '(');

        break;
      case ')':
        setmainText(mainText + ')');
        setmainTextIn(mainTextIn + ')');

        break;
      case 'backspace':
        setmainText(mainText.substring(0, mainText.length - 1));
        setmainTextIn(mainTextIn.substring(0, mainTextIn.length - 1));

        break;

      case 'cos':
        {
          setmainText(mainText + 'cos(');
          setmainTextIn(mainTextIn + 'cos(');
        }

        break;

      case 'sin':
        {
          setmainText(mainText + 'sin(');
          setmainTextIn(mainTextIn + 'sin(');
        }

        break;
      case 'x²':
        setmainText(mainText + '^2');
        setmainTextIn(mainTextIn + '^2');

        break;
      case 'x³':
        setmainText(mainText + '^3');
        setmainTextIn(mainTextIn + '^3');

        break;
      case 'tan':
        {
          setmainText(mainText + 'tan(');
          setmainTextIn(mainTextIn + 'tan(');
        }

        break;
      case 'log':
        setmainText(mainText + 'log(');
        setmainTextIn(mainTextIn + 'log('); //log10

        break;
      case 'ln':
        setmainText(mainText + 'ln(');
        setmainTextIn(mainTextIn + 'ln(');

        break;
      case 'π':
        setmainText(mainText + 'π');
        setmainTextIn(mainTextIn + 'π');

        break;
      case 'root':
        setmainText(mainText + '√');
        setmainTextIn(mainTextIn + '√');

        break;
      case 'root3':
        setmainText(mainText + '∛');
        setmainTextIn(mainTextIn + '∛');

        break;
      case 'inv':
        setmainText(mainText + '1/');
        setmainTextIn(mainTextIn + '1/');

        break;

      case 'sininv':
        {
          setmainText(mainText + 'sin^-1(');
          setmainTextIn(mainTextIn + 'sin^-1(');
        }

        break;
      case 'cosinv':
        {
          setmainText(mainText + 'cos^-1(');
          setmainTextIn(mainTextIn + 'cos^-1(');
        }

        break;
      case 'taninv':
        {
          setmainText(mainText + 'tan^-1(');
          setmainTextIn(mainTextIn + 'tan^-1(');
        }

        break;
      case '10power':
        setmainText(mainText + '10^');
        setmainTextIn(mainTextIn + 'E');

        break;
      case '^':
        setmainText(mainText + '^');
        setmainTextIn(mainTextIn + '^');

        break;

      case 'percent':
        setmainText(mainText + '%');
        setmainTextIn(mainTextIn + '%');

        break;

      case 'x!':
        setmainText(mainText + '!');
        setmainTextIn(mainTextIn + '!');

        break;

      case '.':
        setmainText(mainText + '.');
        setmainTextIn(mainTextIn + '.');

        break;
    }
  }
  function factorial(number) {
    let fact = 1;
    if (number === 0) {
      return fact;
    }
    for (let i = 1; i <= number; i++) {
      fact = fact * i;
    }

    return fact;
  }
  function occurencesIndexes(string, char, simple) {
    if (simple === true) {
      let x = string;
      if (x.indexOf(char) !== -1) {
        return 1;
      } else {
        return 0;
      }
    } else {
      let arr = [];
      for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === char) {
          arr.push(i);
        }
      }
      return arr;
    }
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,

          shadowColor: 'black',
          backgroundColor: '#DFAFFE',
          elevation: 4,
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
        }}>
        <ScrollView contentContainerStyle={MainActivityStyles.scrollView}>
          <Text
            id="textCalc"
            style={{
              fontSize: 70,
              color: 'black',
              textAlign: 'right',
              fontWeight: '300',
            }}>
            {mainText}
          </Text>
          {calculated && (
            <Text
              id="textCalc"
              style={{
                fontSize: 40,
                color: 'black',
                textAlign: 'right',
                fontWeight: '500',
              }}>
              {result}
            </Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 2,
          margin: 2,
          paddingTop: 5,
          borderColor: '#c264ff',
          borderWidth: 1.5,
          borderRadius: 20,
        }}>
        <Row>
          <ButtonCalc
            title={'AC'}
            textColor="red"
            lblStyle={{fontSize: 20, fontWeight: 'bold'}}
            mode="outlined"
            onPress={() => {
              press('AC');
            }}
            style={{width: 60}}
          />
          <ButtonCalc
            title={'+'}
            btnColor="#c264ff"
            lblStyle={{fontSize: 22, fontWeight: 'bold'}}
            mode="contained"
            textColor={'black'}
            onPress={() => {
              press('+');
            }}
            style={{width: 60}}
          />
          <ButtonCalc
            title={'-'}
            mode="contained"
            textColor={'black'}
            btnColor="#c264ff"
            lblStyle={{fontSize: 22, fontWeight: 'bold'}}
            onPress={() => {
              press('-');
            }}
            style={{width: 60}}
          />
          <ButtonCalc
            title={'x'}
            mode="contained"
            textColor={'black'}
            btnColor="#c264ff"
            lblStyle={{fontSize: 22, fontWeight: 'bold'}}
            onPress={() => {
              press('x');
            }}
            style={{width: 60}}
          />
          <ButtonCalc
            title={'÷'}
            mode="contained"
            textColor={'black'}
            btnColor="#c264ff"
            lblStyle={{fontSize: 22, fontWeight: 'bold'}}
            onPress={() => {
              press('÷');
            }}
            style={{width: 60}}
          />
          <ButtonCalc
            title={'⌫'}
            textColor="red"
            mode={'outlined'}
            lblStyle={{fontSize: 20, fontWeight: 'bold'}}
            onPress={() => {
              press('backspace');
            }}
            style={{width: 60}}
          />
        </Row>

        <Row>
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('7');
            }}
            title="7"
            style={{
              width: 58,

              height: 52,
            }}
            btnColor="purple"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('8');
            }}
            title="8"
            style={{
              width: 58,
              height: 52,
            }}
            btnColor="purple"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('9');
            }}
            title="9"
            style={{
              width: 58,
              height: 52,
            }}
            btnColor="purple"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('sin');
            }}
            title="sin"
            btnColor="#c264ff"
            textColor={'black'}
            style={{width: 63}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('x!');
            }}
            title="x!"
            textColor={'black'}
            btnColor="#c264ff"
            style={{width: 63}}
          />
          <ButtonCalc
            mode="contained"
            textColor={'black'}
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('^');
            }}
            title="^"
            btnColor="#c264ff"
            style={{width: 63}}
          />
        </Row>

        <Row>
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('4');
            }}
            title="4"
            style={{
              width: 58,
              height: 52,
            }}
            btnColor="purple"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            title="5"
            onPress={() => {
              press('5');
            }}
            style={{
              width: 58,
              height: 52,
            }}
            btnColor="purple"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('6');
            }}
            title="6"
            style={{
              width: 58,
              height: 52,
            }}
            btnColor="purple"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('cos');
            }}
            title="cos"
            textColor={'black'}
            btnColor="#c264ff"
            style={{width: 63}}
          />

          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('x²');
            }}
            title="x²"
            btnColor="#c264ff"
            textColor={'black'}
            style={{width: 63}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('x³');
            }}
            title="x³"
            btnColor="#c264ff"
            textColor={'black'}
            style={{width: 63}}
          />
        </Row>

        <Row>
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('1');
            }}
            title="1"
            style={{
              width: 58,
              height: 52,
            }}
            btnColor="purple"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('2');
            }}
            title="2"
            btnColor="purple"
            style={{
              width: 58,
              height: 52,
            }}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('3');
            }}
            btnColor="purple"
            title="3"
            style={{
              width: 58,

              height: 52,
            }}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('tan');
            }}
            title="tan"
            textColor={'black'}
            btnColor="#c264ff"
            style={{width: 63}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('log');
            }}
            title="log"
            textColor={'black'}
            btnColor="#c264ff"
            style={{width: 63}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('ln');
            }}
            title="ln"
            btnColor="#c264ff"
            textColor={'black'}
            style={{width: 63}}
          />
        </Row>

        <Row>
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('0');
            }}
            title="0"
            btnColor="purple"
            style={{
              width: 58,
              height: 52,
            }}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('.');
            }}
            title="."
            btnColor="purple"
            style={{width: 58, height: 52}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('=');
            }}
            title="="
            btnColor="purple"
            style={{width: 58, height: 52}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('π');
            }}
            title="π"
            textColor={'black'}
            btnColor="#c264ff"
            style={{width: 63}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('root');
            }}
            title="√"
            btnColor="#c264ff"
            textColor={'black'}
            style={{width: 63}}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('root3');
            }}
            title="∛"
            style={{width: 63}}
            textColor={'black'}
            btnColor="#c264ff"
          />
        </Row>
        <Row>
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('inv');
            }}
            title="1/x"
            style={{width: 61}}
            btnColor="#c264ff"
            textColor={'black'}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('percent');
            }}
            title="%"
            style={{width: 61}}
            btnColor="#c264ff"
            textColor={'black'}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('sininv');
            }}
            title="1/sin"
            style={{width: 61}}
            btnColor="#c264ff"
            textColor={'black'}
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            title="1/cos"
            onPress={() => {
              press('cosinv');
            }}
            style={{width: 61}}
            textColor={'black'}
            btnColor="#c264ff"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('taninv');
            }}
            textColor={'black'}
            title="1/tan"
            style={{width: 61}}
            btnColor="#c264ff"
          />
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('10power');
            }}
            title="10^x"
            textColor={'black'}
            style={{width: 61}}
            btnColor="#c264ff"
          />
        </Row>
        <Row>
          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press('(');
            }}
            title="("
            style={{width: 63}}
            textColor={'black'}
            btnColor="#c264ff"
          />

          <ButtonCalc
            mode="contained"
            lblStyle={{fontSize: 17.4, fontWeight: 'bold'}}
            onPress={() => {
              press(')');
            }}
            title=")"
            style={{width: 63}}
            textColor={'black'}
            btnColor="#c264ff"
          />
        </Row>
      </View>
    </View>
  );
};
export default MainActivity;
