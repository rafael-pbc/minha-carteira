import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

import expenses from "../../repositories/expenses";
import gains from "../../repositories/gains";
import listOfMonths from '../../utils/months'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'
import opsImg from '../../assets/ops.svg'

import { Container, Content } from "./styles";

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

    }, []);

    const months = useMemo(() => {

        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });


    }, []);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amoount must be number.');
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = 2020;
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amoount must be number.');
                }
            }
        });
        return total;
    }, [monthSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mês, você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
                icon: sadImg
            }
        }
        else if (totalGains === 0 && totalExpenses === 0){

            return {
                title: "Ops!",
                description: "Neste mês, não há registros de entradas ou saídas!",
                footerText: "Parece que você não fez registro do mês e ano selecionado.",
                icon: opsImg
            }
        }
        else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mes, você gastou exatamente o que ganhou.",
                footerText: "Tenha cuidado. No próximo tente poupar o seu dinheiro.",
                icon: grinningImg

            }
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir o seu saldo.",
                icon: happyImg
            }
        }
    }, [totalBalance, totalGains, totalExpenses]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));
        

        const data = [{
            name: "Entradas",
            value: totalGains,
            percent: percentGains ? percentGains : 0,
            color: '#E44C4E'
        },
        {
            name: "Saídas",
            value: totalExpenses,
            percent: percentExpenses ? percentExpenses : 0,
            color: '#F7931B'
        }]
        return data;
    }, [totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {

            let amountEntry = 0;

            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = 2020;

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount)
                    } catch {
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }
                }
            });

            let amountOutput = 0;

            expenses.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = 2020;

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountOutput += Number(gain.amount)
                    } catch {
                        throw new Error('amounntOutput is invalid. amounntOutput must be valid number.')
                    }
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput,
            }
        }).filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = 2020;

            return (yearSelected === currentYear && item.monthNumber <= currentMonth)
                || (yearSelected < currentYear) || (yearSelected > currentYear)
        });

    }, [yearSelected]);

    const relationsExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        }).forEach((expenses) => {
            if (expenses.frequency === 'recorrente') {
                return amountRecurrent += Number(expenses.amount)
            }

            if (expenses.frequency === 'eventual') {
                return amountEventual += Number(expenses.amount)
            }
        });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual: 0,
                color: "#E44C4E"
            }
        ];

    }, [monthSelected, yearSelected]);

    const relationsGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        }).forEach((gain) => {
            if (gain.frequency === 'recorrente') {
                return amountRecurrent += Number(gain.amount)
            }

            if (gain.frequency === 'eventual') {
                return amountEventual += Number(gain.amount)
            }
        });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: "#F7931B"
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ];

    }, [monthSelected, yearSelected]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('Invalid month value. Is acept 0 - 24.');
        }
    };

    const handleYearSelected = (month: string) => {
        try {
            const parseYear = Number(month);
            setYearSelected(parseYear);
        } catch {
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

            <Content>
                <WalletBox
                    title="saldo"
                    color="#4E41F0"
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="dolar"
                />

                <WalletBox
                    title="entradas"
                    color="#F7931B"
                    amount={totalGains}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />

                <WalletBox
                    title="saídas"
                    color="#E44C4E  "
                    amount={totalExpenses}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieChartBox data={relationExpensesVersusGains} />
                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"
                />
                <BarChartBox
                    title="Saídas"
                    data={relationsExpensevesRecurrentVersusEventual}
                />
                <BarChartBox
                    title="Entradas"
                    data={relationsGainsRecurrentVersusEventual}
                />
            </Content>
        </Container>
    )
}

export default Dashboard;