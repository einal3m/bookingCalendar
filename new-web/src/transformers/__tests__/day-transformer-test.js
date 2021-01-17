import { transformFromApi } from '../day-transformer';

describe('transformFromApi', () => {
  describe('school holiday', () => {
  	it('sets schoolHoliday to true if api schoolHoliday is set to 1', () => {
      const apiDay = { schoolHoliday: 1 }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.schoolHoliday).toEqual(true);
  	});

  	it('sets schoolHoliday to false if api schoolHoliday is missing', () => {
      const apiDay = {}
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.schoolHoliday).toEqual(false);
  	});

  	it('sets schoolHoliday to true if api schoolHoliday is set to true', () => {
      const apiDay = { schoolHoliday: true }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.schoolHoliday).toEqual(true);
  	});

  	it('sets schoolHoliday to false if api schoolHoliday is set to false', () => {
      const apiDay = { schoolHoliday: false }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.schoolHoliday).toEqual(false);
  	});
  });

  describe('public holiday', () => {
  	it('sets publicHoliday to api publicHoliday if set', () => {
      const apiDay = { publicHoliday: 'Good Friday' }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.publicHoliday).toEqual('Good Friday');
  	});

  	it('sets publicHoliday to null if not set', () => {
      const apiDay = { }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.publicHoliday).toEqual(null);
  	});
  });

  describe('notes', () => {
  	it('sets the notes attribute if it exists', () => {
      const apiDay = { notes: 'my notes' }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.notes).toEqual('my notes');
  	});

  	it('sets the notes attribute to null if no note exists', () => {
      const apiDay = { }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.notes).toEqual(null);
  	});
  });

  describe('bookings', () => {
    it('converts kt to Kay and Trevor', () => {
      const apiDay = { bookings: { kt: 1 } };
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual([{ name: 'Kay', owner: true }, { name: 'Trevor', owner: true }]);
    });

    it('converts mp to Melanie and Paul', () => {
      const apiDay = { bookings: { mp: 1 } };
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual([{ name: 'Melanie', owner: true }, { name: 'Paul', owner: true }]);
    });

    it('converts fs to Felicity and Samantha', () => {
      const apiDay = { bookings: { fs: 1 } };
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual([{ name: 'Felicity', owner: true }, { name: 'Samantha', owner: true }]);
    });

    it('converts ls to Lesley and Odin', () => {
      const apiDay = { bookings: { ls: 1 } };
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual([{ name: 'Lesley', owner: true }, { name: 'Odin', owner: true }]);
    });

    it('converts anything else as is, with owner set to false', () => {
      const apiDay = { bookings: { guest: 1 } };
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual([{ name: 'guest', owner: false }]);
    });

    it('converts multiple bookings', () => {
      const apiDay = { bookings: { guest: 1, mp: 1 } };
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual([{ name: 'guest', owner: false }, { name: 'Melanie', owner: true }, { name: 'Paul', owner: true }]);
    });
  });

  describe('guests', () => {
  	it('sets the guests as an empty array if it doesnt exist', () => {
      const apiDay = { }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual([]);
  	});

  	it('sets the guests if they exist', () => {
      const apiDay = { guests: [{ "name": "Melanie", "owner": true }] }
      const transformedDay = transformFromApi(apiDay);
      expect(transformedDay.guests).toEqual(apiDay.guests);
  	})
  });
});
