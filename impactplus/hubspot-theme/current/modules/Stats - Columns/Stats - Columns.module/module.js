function sizeSectionColumnsDividers() {
  setTimeout(function () {
    const sections = document.querySelectorAll('.section--statscolumns--hasdividers')

    sections.forEach(function (thisSection) {
      const firstColumn = thisSection.querySelector(
        '.section--statscolumns--column:nth-child(1)'
      )
      const thisSectionColumnVerticalPadding =
        (firstColumn.offsetHeight - firstColumn.clientHeight) / 2

      const dividers = thisSection.querySelectorAll(
        '.section--statscolumns--divider--vertical'
      )
      dividers.forEach((divider) => {
        divider.style.height = ''
        divider.style.margin = ''
      })

      const columnBodies = thisSection.querySelectorAll(
        '.section--statscolumns--column--body, .section--statscolumns--column--body--content'
      )
      columnBodies.forEach((body) => {
        body.style.minHeight = ''
      })

      let rowHeights = []
      let contentHeights = []
      let totalColumns = thisSection.querySelectorAll(
        '.section--statscolumns--column'
      ).length
      let columnWidths = {}
      const thisColumns = thisSection.querySelector('.section--statscolumns--grid')

      if (thisColumns) {
        columnWidths['desk'] =
          parseInt(thisColumns.getAttribute('data-columns--desk')) || 0
        columnWidths['lap'] =
          parseInt(thisColumns.getAttribute('data-columns--lap')) || 0
        columnWidths['tablet'] =
          parseInt(thisColumns.getAttribute('data-columns--tablet')) || 0
        columnWidths['palm'] =
          parseInt(thisColumns.getAttribute('data-columns--palm')) || 0
      }

      const columns = thisSection.querySelectorAll('.section--statscolumns--column')
      columns.forEach(function (column, index) {
        const thisHeight = column.querySelector(
          '.section--statscolumns--column--body'
        ).offsetHeight
        const contentHeight = column.querySelector(
          '.section--statscolumns--column--body--content'
        ).offsetHeight
        let rowIndex

        if (viewport('desk')) {
          rowIndex = Math.floor(index / columnWidths['desk'])
        } else if (viewport('lap')) {
          rowIndex = Math.floor(index / columnWidths['lap'])
        } else if (viewport('tablet')) {
          rowIndex = Math.floor(index / columnWidths['tablet'])
        } else if (viewport('palm')) {
          rowIndex = Math.floor(index / columnWidths['palm'])
        } else {
          rowIndex = 0
        }

        if (!rowHeights[rowIndex]) {
          rowHeights[rowIndex] = 0
          contentHeights[rowIndex] = 0
        }

        if (thisHeight > rowHeights[rowIndex]) {
          rowHeights[rowIndex] = thisHeight
        }
        if (contentHeight > contentHeights[rowIndex]) {
          contentHeights[rowIndex] = contentHeight
        }
      })

      let columnCount
      if (viewport('desk')) {
        columnCount = columnWidths['desk']
      } else if (viewport('lap')) {
        columnCount = columnWidths['lap']
      } else if (viewport('tablet')) {
        columnCount = columnWidths['tablet']
      } else if (viewport('palm')) {
        columnCount = columnWidths['palm']
      } else {
        columnCount = 1
      }

      columns.forEach(function (column, index) {
        let rowIndex
        if (viewport('desk')) {
          rowIndex = Math.floor(index / columnWidths['desk'])
        } else if (viewport('lap')) {
          rowIndex = Math.floor(index / columnWidths['lap'])
        } else if (viewport('tablet')) {
          rowIndex = Math.floor(index / columnWidths['tablet'])
        } else if (viewport('palm')) {
          rowIndex = Math.floor(index / columnWidths['palm'])
        } else {
          rowIndex = 0
        }

        const contentBody = column.querySelector(
          '.section--coulumns--column--body--content'
        )
        const body = column.querySelector('.section--statscolumns--column--body')

        if (contentBody) {
          contentBody.style.minHeight = contentHeights[rowIndex] + 'px'
        }
        if (body) {
          body.style.minHeight = rowHeights[rowIndex] + 'px'
        }
      })

      dividers.forEach(function (divider, index) {
        const rowIndex = Math.floor(index / columnCount)
        divider.style.height = rowHeights[rowIndex] + 0 + 'px'
        divider.style.margin = thisSectionColumnVerticalPadding + 'px 0px'
      })
    })
  }, 100)
}

document.addEventListener('DOMContentLoaded', function () {
  sizeSectionColumnsDividers()
})
window.addEventListener('load', function () {
  sizeSectionColumnsDividers()
})
window.addEventListener('resize', function () {
  sizeSectionColumnsDividers()
})
