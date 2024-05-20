import React, { useState, useMemo} from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from '../../utils/months'

import { Container } from "./styles";

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(2020);

    const years = useMemo(() => {
        let uniqueYers: number[] = [];


        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYers.includes(year)) {
                uniqueYers.push(year);
            }
        });

        return uniqueYers.map(year => {
            return {
                value: year,
                label: year
            }
        });

    }, [])

    const months = useMemo(() => {

        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });


    }, []);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('Invalid month value. Is acept 0 - 24.');
        }
    };

    const handleYearSelected = (month: string) => {
        try {
            const parseYear = Number(month);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Invalid year value. Is acept numbers.');
        }
    };

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected}
                />

                <SelectInput
                    options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected}
                />
            </ContentHeader>
        </Container>
    )
}

export default Dashboard;