#!/usr/bin/env node

import opn from 'opn';
import { startServer } from '../server';

startServer()
    .then(opn)
    .catch(console.error);