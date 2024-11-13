'use client';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  Loader2,
  MoreHorizontal,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

export type DomesticViolenceReport = {
  _id: string; // Unique identifier for the report
  name: string; // Name of the person
  location: string; // Location as a comma-separated string (e.g., "13.0646016, 80.2062336")
  preferredWayOfContact: string; // Preferred way of contact (e.g., "Phone")
  contactInfo: string; // Contact information (e.g., phone number)
  frequencyOfDomesticViolence: string; // Frequency of domestic violence (e.g., "7 times a week")
  relationshipWithPerpetrator: string; // Relationship with the perpetrator (e.g., "Not specified")
  severityOfDomesticViolence: string; // Severity level (e.g., "Sev3 (Frequent physical abuse or threats)")
  natureOfDomesticViolence: string; // Nature of domestic violence (e.g., "Physical")
  impactOnChildren: string; // Impact on children (e.g., "The child is currently being hurt and needs immediate help.")
  culpritDetails: string; // Details of the culprit (e.g., "A person with dark skin")
  otherInfo: string; // Other additional information (e.g., "The situation has been happening for 10 years and is incredibly serious.")
};

// Function to convert coordinates to city name
const fetchCityName = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&q=${lat}%2C${lng}`
    );
    const data = await response.json();
    return data.results[0]?.components?.city || 'Unknown location';
  } catch (error) {
    console.error('Error fetching city name:', error);
    return 'Unknown location';
  }
};

export const columns: ColumnDef<DomesticViolenceReport>[] = [
  {
    id: 'sno',
    header: 'S.No',
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
  },
  {
    accessorKey: 'Name',
    header: 'Name',
  },
  {
    accessorKey: 'city',
    header: 'Location',
    cell: ({ row }) => <div>{row.getValue('city') || 'Loading...'}</div>,
  },
  {
    accessorKey: 'Severity of domestic violence',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Severity
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={`priority-badge priority-${row.original.severityOfDomesticViolence}`}
      >
        {row.getValue('Severity of domestic violence')}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      const severityA = rowA.getValue('severity');
      const severityB = rowB.getValue('severity');
      return (
        priorityOrder[severityA as keyof typeof priorityOrder] -
        priorityOrder[severityB as keyof typeof priorityOrder]
      );
    },
  },
  {
    accessorKey: 'issue',
    header: 'Issue',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const post = row.original;

      const handleCompleteIssue = async () => {
        try {
          // Update the issue status to 'Completed'
          const updatedPost = { ...post, status: 'Completed' };

          // Perform any API call here to update the status in the backend if necessary
          const response = await fetch('/api/updatePostStatus', {
            method: 'POST',
            body: JSON.stringify(updatedPost),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            // Update the status in the UI
            //
          } else {
            console.error(
              'Failed to update issue status:',
              response.statusText
            );
          }
        } catch (error) {
          console.error('Error completing issue:', error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(post._id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/post/${post._id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCompleteIssue}>
              Complete Issue
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function RealtimeList() {
  const [data, setData] = React.useState<DomesticViolenceReport[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getPosts');
        const result = await response.json();
        console.log(result);
        // const enrichedData = await Promise.all(
        //   result.map(async (post: DomesticViolenceReport) => ({
        //     ...post,
        //     city: await fetchCityName(post.location.lat, post.location.lng),
        //   }))
        // );

        // setData(enrichedData);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
