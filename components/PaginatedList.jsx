import React, { useState, useEffect } from 'react'
import styles from '../styles/utils.module.css'

export default function PaginatedList({ children, itemsPerPage }) {
  const [page, setPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(itemsPerPage);
  const [childrenToShow, setChildrenToShow] = useState(children.slice(0, itemsPerPage));

  const changePage = (change) => {
    setPage(page + change);
    const newFirst = firstIndex + (itemsPerPage * change)
    const newLast = lastIndex + (itemsPerPage * change)
    setFirstIndex(newFirst);
    setLastIndex(newLast);
    setChildrenToShow(children.slice(newFirst, newLast));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {childrenToShow}

      {children.length > 5 &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <button class={styles.navButton} disabled={lastIndex >= children.length} onClick={() => changePage(1)}>Next</button>
            <button class={styles.navButton} disabled={firstIndex <= 0} onClick={() => changePage(-1)}>Previous</button>
          </div>
          <p>Page {page} of {Math.ceil(children.length / itemsPerPage)}</p>
        </div>
      }
    </div>
  )
}
