'use strict';

var renderStatistics = function (ctx, names, times) {
  // Настройки окна статистики
  var sets = {
    fontFamily: 'PT Mono',
    defaultFontSize: 16,
    defaultColor: 'black',
    defaultBgColor: 'white',
    modalWindow: {
      coordX: 100,
      coordY: 10,
      width: 420,
      height: 270,
      title: 'Ура вы победили!\nСписок результатов:'
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

  // Определяет максимальный элемент-число массива
  var maxNumberArrayElement = function (numArray) {
    var maxElement = numArray[0];
    for (var i = 0; i < numArray.length; i++) {
      if (numArray[i] > maxElement) {
        maxElement = numArray[i];
      }
    }
    return maxElement;
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
    // Находим коэффициент пропорциональности для высоты гистограммы с учетом надписей у каждой колонки
    var ratio = maxNumberArrayElement(timesArray) / (sets.hist.height - sets.defaultFontSize * 2);

    // Выводит колонку с надписями, для имени "Вы" назначает специальный цвет
    var drawBar = function (count, name, time) {
      var barHeight = Math.floor(time / ratio); // высота колонки в пропорции
      var barX = x + count * (sets.hist.columnWidth + sets.hist.columnsGap); // начальная координата X
      var barY = y + sets.hist.height - sets.defaultFontSize * 2 - barHeight; // yачальная координата Y

      printText(context, Math.floor(time), barX, barY, sets.defaultFontSize);
      context.fillStyle = name === 'Вы' ? sets.hist.currentColor : sets.hist.getOtherColor();
      context.fillRect(barX, barY + sets.defaultFontSize, sets.hist.columnWidth, barHeight);
      printText(
          context,
          name,
          barX,
          barY + sets.defaultFontSize * 2 + barHeight,
          sets.defaultFontSize
      );
    };

    // Выводим все колонки гистограммы в цикле
    for (var i = 0; i < namesArray.length; i++) {
      drawBar(i, namesArray[i], timesArray[i]);
    }
  };

  // Поочередно выводим модальное окно, печатаем заголовок и рисуем гистограмму
  drawModalWindow(ctx, sets.modalWindow.coordX, sets.modalWindow.coordY, sets.modalWindow.width, sets.modalWindow.height);
  printText(ctx, sets.modalWindow.title, sets.modalWindow.coordX + 20, sets.modalWindow.coordY + 30, sets.defaultFontSize);
  drawHistogram(ctx, sets.modalWindow.coordX + 40, sets.modalWindow.coordY + sets.defaultFontSize + 70, names, times);
};

window.renderStatistics = renderStatistics;

// /EOF
