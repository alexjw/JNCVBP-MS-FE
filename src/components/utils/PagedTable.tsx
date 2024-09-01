import React, { useEffect, useState } from "react";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import styled from "styled-components";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/client";
import Spinner from "../spinner";

interface TheProps {
  columns: ColumnDescription<any, any>[];
  keyField?: string;
  query: DocumentNode;
  disabled?: boolean;
}

const PagedTable: React.FC<TheProps> = ({ disabled = false, ...props }) => {
  const theColumns = props.columns.map((theColumn) => ({ ...theColumn, sort: !!theColumn.dataField }));
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSizePerPage, setCurrentSizePerPage] = useState(10);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const theQuery = useQuery(props.query, {
    variables: { limit: currentSizePerPage, offset: 0, sortField, sortOrder, searchText: "", disabled: !!disabled },
  });

  //console.log({theQuery: _.cloneDeep(theQuery)});
  if (theQuery.loading) return <Spinner />;

  return (
    <Wrapper>
      <ToolkitProvider
        keyField={props.keyField || "id"}
        data={theQuery.data?.page?.items || []}
        columns={theColumns}
        search={true}
      >
        {({ searchProps, baseProps }) => (
          <>
            <CustomSearch {...searchProps} />
            <BootstrapTable
              {...baseProps}
              {...searchProps}
              pagination={paginationFactory({
                sizePerPage: currentSizePerPage,
                showTotal: true,
                totalSize: theQuery.data.page.totalSize,
                page: currentPage,
                pageStartIndex: 1,
                firstPageText: "First",
                prePageText: "Back",
                nextPageText: "Next",
                lastPageText: "Last",
                nextPageTitle: "First page",
                prePageTitle: "Previous page",
                firstPageTitle: "Next page",
                lastPageTitle: "Last page",
                sizePerPageList: [5, 10, 15, 20],
              })}
              bootstrap4={true}
              remote={{
                filter: true,
                pagination: true,
                sort: true,
                cellEdit: false,
              }}
              sort={{ dataField: sortField, order: sortOrder }}
              onTableChange={(type, newState) => {
                theQuery.refetch({
                  offset: (newState.page - 1) * newState.sizePerPage,
                  limit: newState.sizePerPage,
                  sortField: newState.sortField,
                  sortOrder: newState.sortOrder,
                  searchText: searchProps.searchText,
                });
                setCurrentPage(newState.page);
                setCurrentSizePerPage(newState.sizePerPage);
                setSortField(newState.sortField || "id");
                setSortOrder(newState.sortOrder || "desc");
              }}
            />
          </>
        )}
      </ToolkitProvider>
    </Wrapper>
  );
};

const CustomSearch = (props) => {
  const { input, ...restProps } = props;

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-search" />
          </div>
        </div>
        <input
          ref={input}
          type="text"
          className="form-control"
          placeholder="Buscar"
          onChange={(e) => {
            restProps.onSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  .pagination {
    justify-content: end;
  }
`;

export default PagedTable;
