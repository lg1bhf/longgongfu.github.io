function worksheet (name) {
  return excel.workbook.worksheets.getItem(name)
}

function coverage (start) {
  if (start) {
    workbookName = excel.workbook.name
    thisYear = Number(workbookName.substring(0, 4))
    thisMonth = Number(workbookName.substring(5, 7))
    if (thisMonth < 12) {
      nextYear = thisYear
      nextMonth = thisMonth + 1
    } else {
      nextYear = thisYear + 1
      nextMonth = 1
    }
    d = new Date(thisYear, thisMonth - 1, 1)
    e = new Date(nextYear, nextMonth - 1, 1)
    end = (e.getTime() - d.getTime()) / 86400000
    return thisYear + " 年 " + thisMonth + " 月 " + start + " 日 - " + thisYear + " 年 " + thisMonth + " 月 " + end + " 日"
  } else {
    return ""
  }
}

function hide () {
  summary = worksheet("總表")
  for (r = 2; r <= 30; r++) {
    start = val(summary, r, 3)
    if (start) {
      activeSheet = worksheet(val(summary, r, 1))
      mobile = val(summary, r, 2)
      val(activeSheet, 7, 4, rooms(mobile))
      val(activeSheet, 8, 4, mobile)
      val(activeSheet, 9, 4, coverage(start))
      val(activeSheet, 11, 5, val(summary, r, 4))
      val(activeSheet, 12, 5, val(summary, r, 7) * 1.7)
      val(activeSheet, 13, 5, val(summary, r, 8))
      sentences = readings(mobile)
      for (i = 0; i < sentences.length; i++) {
        val(activeSheet, 25 + i, 2, sentences[i])
      }
    } else {
      worksheet(val(summary, r, 1)).visibility = Excel.SheetVisibility.hidden
    }
  }
  summary.visibility = Excel.SheetVisibility.hidden
}

function readings (phone) {
  summary = worksheet("總表")
  result = []
  i = 2
  while (val(summary, i, 1)) {
    if (val(summary, i, 2).toString() == phone.toString()) {
      room = val(summary, i, 1)
      prev = val(summary, i, 5)
      curr = val(summary, i, 6)
      result.push(room + " 電錶上期 " + prev + "，今期 " + curr + "。")
    }
    i = i + 1
  }
  return result
}

function rooms (phone) {
  return readings(phone).map(function (reading) {
    return reading.substring(0, 4)
  }).join(" / ")
}

function search (colNum) {
  // OK
  summary = worksheet("總表")
  for (rowNum = 1; rowNum <= 1000; rowNum++) {
    if (val(summary, rowNum, 1) == excel.workbook.worksheets.getActiveSheet().name) {
      return val(summary, rowNum, colNum)
    }
  }
}

function val (sheet, r, c, value=null) {
  // OK
  cell = sheet.getCell(r, c)
  if (value) {
    cell.values = value
  } else {
    return cell.values
  }
}

function unhide () {
  // OK
  for (worksheet of excel.workbook.worksheets.items) {
    worksheet.visibility = Excel.SheetVisibility.visible
  }
}
