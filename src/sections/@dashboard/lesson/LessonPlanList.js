import { useState, useEffect } from 'react';
import axios from 'src/utils/axios';
// next
import Head from 'next/head';
// @mui
import { Stack, Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fTimestamp } from '../../../utils/formatTime';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// _mock_
import { _allFiles } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import ConfirmDialog from '../../../components/confirm-dialog';
import { fileFormat } from '../../../components/file-thumbnail';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { useTable, getComparator } from '../../../components/table';
import DateRangePicker, { useDateRangePicker } from '../../../components/date-range-picker';
// sections
import {
  FileListView,
  FileGridView,
  FileFilterName,
  FileFilterButton,
  FileNewFolderDialog,
} from '../../../sections/@dashboard/file';
import LessonPDF from './PDF/details/LessonPDF';

LessonPlanList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LessonPlanList() {
  const table = useTable({ defaultRowsPerPage: 10 });

  const {
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);

  const { themeStretch } = useSettingsContext();

  const [view, setView] = useState('list');

  const [filterName, setFilterName] = useState('');

  const [tableData, setTableData] = useState([]);

  const [filterType, setFilterType] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openUploadFile, setOpenUploadFile] = useState(false);

  // ----------------------------------------------------------------------
  // Fetch lessons from the API
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Retrieve the token
    axios
      .get('/api/get-all-lessons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTableData(response.data.lessons);
      })
      .catch((error) => {
        console.log('Error fetching lesson plans:', error);
      });
  }, []);
  // ----------------------------------------------------------------------

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterType,
    filterStartDate: startDate,
    filterEndDate: endDate,
    isError: !!isError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterType) ||
    (!dataFiltered.length && !!endDate && !!startDate);

  const isFiltered = !!filterName || !!filterType.length || (!!startDate && !!endDate);

  const handleChangeView = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleFilterName = (event) => {
    table.setPage(0);
    setFilterName(event.target.value);
  };

  const handleChangeStartDate = (newValue) => {
    table.setPage(0);
    onChangeStartDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    table.setPage(0);
    onChangeEndDate(newValue);
  };

  const handleFilterType = (type) => {
    const checked = filterType.includes(type)
      ? filterType.filter((value) => value !== type)
      : [...filterType, type];

    table.setPage(0);
    setFilterType(checked);
  };

  const handleDeleteItem = (id) => {
    const { page, setPage, setSelected } = table;

    const token = localStorage.getItem('accessToken'); // Retrieve the token
    axios
      .delete(`/api/delete-lesson/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setSelected([]);
        setTableData(deleteRow);

        if (page > 0) {
          if (dataInPage.length < 2) {
            setPage(page - 1);
          }
        }
      })
      .catch((error) => {
        console.log('Error deleting lesson:', error);
      });
  };

  const handleDeleteItems = (selected) => {
    const { page, rowsPerPage, setPage, setSelected } = table;
    const token = localStorage.getItem('accessToken'); // Retrieve the token
    axios
      .delete('/api/delete-lessons', {
        data: { ids: selected },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const deleteRows = tableData.filter((row) => !selected.includes(row.id));
        setSelected([]);
        setTableData(deleteRows);

        if (page > 0) {
          if (selected.length === dataInPage.length) {
            setPage(page - 1);
          } else if (selected.length === dataFiltered.length) {
            setPage(0);
          } else if (selected.length > dataInPage.length) {
            const newPage = Math.ceil((tableData.length - selected.length) / rowsPerPage) - 1;
            setPage(newPage);
          }
        }
      })
      .catch((error) => {
        console.log('Error deleting lessons:', error);
      });
  };

  const handleClearAll = () => {
    if (onResetPicker) {
      onResetPicker();
    }
    setFilterName('');
    setFilterType([]);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  return (
    <>
      <Head>
        <title> My Lesson Plans | Sparkaplan</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="My Lesson Plans"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'My Lesson Plans' },
          ]}
          //   action={
          //     <Button
          //       variant="contained"
          //       startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          //       onClick={handleOpenUploadFile}
          //     >
          //       Upload
          //     </Button>
          //   }
        />

        <Stack
          spacing={2.5}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Stack
            spacing={1}
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ md: 'center' }}
            sx={{ width: 1 }}
          >
            <FileFilterName filterName={filterName} onFilterName={handleFilterName} />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <>
                <FileFilterButton
                  isSelected={!!isSelectedValuePicker}
                  startIcon={<Iconify icon="eva:calendar-fill" />}
                  onClick={onOpenPicker}
                >
                  {isSelectedValuePicker ? shortLabel : 'Select Date'}
                </FileFilterButton>

                <DateRangePicker
                  variant="calendar"
                  startDate={startDate}
                  endDate={endDate}
                  onChangeStartDate={handleChangeStartDate}
                  onChangeEndDate={handleChangeEndDate}
                  open={openPicker}
                  onClose={onClosePicker}
                  isSelected={isSelectedValuePicker}
                  isError={isError}
                />
              </>

              {isFiltered && (
                <Button
                  variant="soft"
                  color="error"
                  onClick={handleClearAll}
                  startIcon={<Iconify icon="eva:trash-2-outline" />}
                >
                  Clear
                </Button>
              )}
            </Stack>
          </Stack>

          {/* <FileChangeViewButton value={view} onChange={handleChangeView} /> */}
        </Stack>

        {view === 'list' ? (
          <FileListView
            table={table}
            tableData={tableData}
            dataFiltered={dataFiltered}
            onDeleteRow={handleDeleteItem}
            isNotFound={isNotFound}
            onOpenConfirm={handleOpenConfirm}
          />
        ) : (
          <FileGridView
            table={table}
            data={tableData}
            dataFiltered={dataFiltered}
            onDeleteItem={handleDeleteItem}
            onOpenConfirm={handleOpenConfirm}
          />
        )}
      </Container>

      <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteItems(table.selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterType,
  filterStartDate,
  filterEndDate,
  isError,
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (file) => file.lesson_title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterType.length) {
    inputData = inputData.filter((file) => filterType.includes(fileFormat(file.type)));
  }

  if (filterStartDate && filterEndDate && !isError) {
    inputData = inputData.filter(
      (file) =>
        fTimestamp(file.date_created) >= fTimestamp(filterStartDate) &&
        fTimestamp(file.date_created) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}
