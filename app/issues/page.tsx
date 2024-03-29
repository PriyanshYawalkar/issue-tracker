import React from 'react'
import { Table, TableColumnHeaderCell, TableRow } from '@radix-ui/themes';
import Link from '../components/Link';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/issueStatusBadge';
import delay from 'delay';
import IssueActions from './IssueActions';

const IssuesPage = async () => {

    const issues = await prisma.issues.findMany();
    await delay(2000);

    return (
        <div>
            <IssueActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <TableRow key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </TableRow>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default IssuesPage