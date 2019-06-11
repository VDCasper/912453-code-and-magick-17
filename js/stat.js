'use strict';

var renderStatistics = function (ctx, names, times) {
  // Настройки окна статистики
  var sets = {
    fontFamily: 'PT Mono',
    defaultFontSize: 16,
    defaultColor: 'black',
    defaultBgColor: 'white',
    window: {
      x: 100,
      y: 10,
      width: 420,
      height: 270,
      title: 'Ура вы победили!\nСписок результатов:',
      fontSize: 16
    },
    shadow: {
      shift: 10,
      color: 'rgba(0, 0, 0, 0.7)'
    },
    hist: {
      height: 150,
      columnWidth: 40,
      columnsGap: 50,
      currentColor: 'rgba(255, 0, 0, 1)',
      getOtherColor: function () {
        return 'hsl(240,' + Math.random() * 100 + '%, 50%)';
      }
    }
  };

  // Вывод модального окна с тенью
  var drawModalWindow = function (context, x, y, width, height, bgColor) {
    var currentContextFillStyle = ctx.fillStyle;

    context.fillStyle = sets.shadow.color;
    context.fillRect(x + sets.shadow.shift, y + sets.shadow.shift, width, height);
    context.fillStyle = bgColor ? bgColor : sets.defaultBgColor;
    context.strokeRect(x, y, width, height);
    context.fillRect(x, y, width, height);

    context.fillStyle = currentContextFillStyle;
  };

  // Вывод многострочного текста в указанный контекст
  // Переносы строк по символу конца строки из текста
  var printText = function (context, text, x, y, fontSize, color) {
    var currentContextFillStyle = context.fillStyle; // сохраняем текущий стиль чтобы потом вернуть
    context.font = fontSize + 'px ' + sets.fontFamily;
    context.fillStyle = color ? color : sets.defaultColor;
    var strings = (text + '').split('\n');

    // Выводим отдельные строки
    for (var i = 0; i < strings.length; i++) {
      context.fillText(strings[i], x, y + fontSize * i);
    }

    context.fillStyle = currentContextFillStyle;
  };

  // Рисует гистограмму в заданном месте
  var drawHistogram = function (context, x, y, namesArray, timesArray) {
    // Сначала определяе максимальное время
    var maxTime = function (numArray) {
      var maxElement = 0;
      for (var i = 0; i < numArray.length; i++) {
        if (numArray[i] > maxElement) {
          maxElement = numArray[i];
        }
      }
      return maxElement;
    };

    // Находим коэффициент пропорциональности для высоты гистограммы с учетом надписей у каждой колонки
    var mapRatio = maxTime(timesArray) / (sets.hist.height - sets.defaultFontSize * 2);

    // Возвращает высоту колонки
    var timeMap = function (time) {
      return Math.floor(time / mapRatio);
    };

    // Выводит колонку с надписями, для имени "Вы" назначает специальный цвет
    var drawBar = function (count, name, time) {
      var barX = x + count * (sets.hist.columnWidth + sets.hist.columnsGap); // начальная координата X
      var barY = y + sets.hist.height - sets.defaultFontSize * 2 - timeMap(time); // yачальная координата Y

      printText(context, Math.floor(time), barX, barY, sets.defaultFontSize);
      context.fillStyle = name === 'Вы' ? sets.hist.currentColor : sets.hist.getOtherColor();
      context.fillRect(barX, barY + sets.defaultFontSize, sets.hist.columnWidth, timeMap(time));
      printText(
          context,
          name,
          barX,
          barY + sets.defaultFontSize * 2 + timeMap(time),
          sets.defaultFontSize
      );
    };

    // Выводим все колонки гистограммы в цикле
    for (var i = 0; i < namesArray.length; i++) {
      drawBar(i, namesArray[i], timesArray[i]);
    }
  };

  // Поочередно выводим модальное окно, печатаем заголовок и рисуем гистограмму
  drawModalWindow(ctx, sets.window.x, sets.window.y, sets.window.width, sets.window.height);
  printText(ctx, sets.window.title, sets.window.x + 20, sets.window.y + 30, sets.defaultFontSize);
  drawHistogram(ctx, sets.window.x + 40, sets.window.y + sets.defaultFontSize + 70, names, times);
};

// /EOF
